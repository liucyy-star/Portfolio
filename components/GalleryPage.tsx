import Image from "next/image";
import type { Gallery } from "@/lib/galleries";

export default function GalleryPage({ gallery }: { gallery: Gallery }) {
  return (
    <main className="gallery-page">
      <header className="gallery-head">
        <div className="mono gallery-kicker">{gallery.kicker}</div>
        <h1>{gallery.title}</h1>
        <p>{gallery.intro}</p>
      </header>

      <div className="gallery-grid">
        {gallery.items.map((item) => (
          <figure key={item.src} className="gallery-item">
            <Image
              src={item.src}
              alt={item.alt}
              width={0}
              height={0}
              sizes="(max-width: 700px) 100vw, 33vw"
              style={{ width: "100%", height: "auto" }}
            />
            {item.caption && <figcaption>{item.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </main>
  );
}