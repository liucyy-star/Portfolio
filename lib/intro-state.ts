// Tiny shared flag + event so any component can know whether the intro
// animation has finished, without wiring props through the whole tree.
export const introState = { done: false };

export function markIntroDone() {
  introState.done = true;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("introdone"));
  }
}
