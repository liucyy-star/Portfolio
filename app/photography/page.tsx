import GalleryPage from "@/components/GalleryPage";
import { photography } from "@/lib/galleries";

export const metadata = { title: "Photography — Christina Liu" };

export default function Page() {
  return <GalleryPage gallery={photography} />;
}
