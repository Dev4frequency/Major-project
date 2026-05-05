import { toast } from "sonner";

export function startMonitoring({ onTerminate, enforceFullscreen = true }: { onTerminate: () => void; enforceFullscreen?: boolean }) {
  let warnings = 0;
  let cleaned = false;
  const trigger = (reason: string) => {
    if (cleaned) return;
    warnings += 1;
    if (warnings === 1) toast.warning(`Warning 1/3: ${reason}`);
    else if (warnings === 2) toast.error(`Strong warning 2/3: ${reason}`);
    else { toast.error(`Test terminated: ${reason}`); cleanup(); onTerminate(); }
  };
  const onVis = () => { if (document.hidden) trigger("Tab switch"); };
  const onBlur = () => trigger("Window lost focus");
  const onCopy = (e: ClipboardEvent) => { e.preventDefault(); trigger("Copy"); };
  const onPaste = (e: ClipboardEvent) => { e.preventDefault(); trigger("Paste"); };
  const onCut = (e: ClipboardEvent) => { e.preventDefault(); trigger("Cut"); };
  const onCtx = (e: MouseEvent) => e.preventDefault();
  const onFs = () => { if (enforceFullscreen && !document.fullscreenElement) trigger("Exited fullscreen"); };
  document.addEventListener("visibilitychange", onVis);
  window.addEventListener("blur", onBlur);
  document.addEventListener("copy", onCopy);
  document.addEventListener("paste", onPaste);
  document.addEventListener("cut", onCut);
  document.addEventListener("contextmenu", onCtx);
  document.addEventListener("fullscreenchange", onFs);
  function cleanup() {
    if (cleaned) return;
    cleaned = true;
    document.removeEventListener("visibilitychange", onVis);
    window.removeEventListener("blur", onBlur);
    document.removeEventListener("copy", onCopy);
    document.removeEventListener("paste", onPaste);
    document.removeEventListener("cut", onCut);
    document.removeEventListener("contextmenu", onCtx);
    document.removeEventListener("fullscreenchange", onFs);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }
  if (enforceFullscreen) document.documentElement.requestFullscreen?.().catch(() => toast.error("Fullscreen required."));
  return cleanup;
}