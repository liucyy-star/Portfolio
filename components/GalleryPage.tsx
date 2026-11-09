import type { Gallery } from "@/lib/galleries";
import PaperDesk from "./PaperDesk";

export default function GalleryPage({ gallery }: { gallery: Gallery }) {
  return (
    <main className="gallery-page">
      <header className="gallery-head">
        <div className="mono gallery-kicker">{gallery.kicker}</div>
        <h1>{gallery.title}</h1>
        <p>{gallery.intro}</p>
      </header>

      <PaperDesk items={gallery.items} label={gallery.title} />
    </main>
  );
}
