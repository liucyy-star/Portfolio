// Dev-only storage for the click-to-comment overlay (components/SiteNotes.tsx).
// Notes are kept in site-notes.json at the project root so they can be read
// and worked through straight from the repo. Returns 404 outside `next dev`.

import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FILE = path.join(process.cwd(), "site-notes.json");
const isDev = process.env.NODE_ENV === "development";

type Note = { id: string; [key: string]: unknown };

async function load(): Promise<Note[]> {
  try {
    const parsed = JSON.parse(await fs.readFile(FILE, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Serialise writes so two quick saves can't clobber each other.
let queue: Promise<unknown> = Promise.resolve();
function mutate(fn: (notes: Note[]) => Note[]): Promise<Note[]> {
  const run = queue.then(async () => {
    const next = fn(await load());
    await fs.writeFile(FILE, JSON.stringify(next, null, 2) + "\n", "utf8");
    return next;
  });
  queue = run.catch(() => {});
  return run;
}

const notFound = () => new NextResponse(null, { status: 404 });

export async function GET() {
  if (!isDev) return notFound();
  return NextResponse.json(await load());
}

// Add a note.
export async function POST(req: Request) {
  if (!isDev) return notFound();
  const note = (await req.json()) as Note;
  if (!note?.id) return NextResponse.json({ error: "missing id" }, { status: 400 });
  return NextResponse.json(await mutate((all) => [...all.filter((n) => n.id !== note.id), note]));
}

// Update fields on a note: { id, ...fields }.
export async function PATCH(req: Request) {
  if (!isDev) return notFound();
  const { id, ...fields } = (await req.json()) as Note;
  return NextResponse.json(await mutate((all) => all.map((n) => (n.id === id ? { ...n, ...fields } : n))));
}

// Remove a note: ?id=...
export async function DELETE(req: Request) {
  if (!isDev) return notFound();
  const id = new URL(req.url).searchParams.get("id");
  return NextResponse.json(await mutate((all) => all.filter((n) => n.id !== id)));
}
