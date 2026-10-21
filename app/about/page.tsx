import CursorBlob from "@/components/CursorBlob";
import { RESUME_URL } from "@/lib/site";


export default function AboutMe() {
  return (
    <>
      <CursorBlob />

      <iframe
        src={RESUME_URL}
        title="Resume"
        style={{ width: "100%", height: "100vh", border: "none" }}
      />
    </>
  );
}
