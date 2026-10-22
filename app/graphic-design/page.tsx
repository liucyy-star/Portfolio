import GalleryPage from "@/components/GalleryPage";
import { graphicDesign } from "@/lib/galleries";

export const metadata = { title: "Graphic Design — Christina Liu" };

export default function Page() {
  return <GalleryPage gallery={graphicDesign} />;
}