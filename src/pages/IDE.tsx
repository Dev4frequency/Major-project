import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ASSIGNMENTS, MODULES } from "@/lib/content";
import { ModuleId, useApp } from "@/context/AppContext";
import { startMonitoring } from "@/lib/monitoring";

const IDE = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const moduleId = id as ModuleId;
  const meta = MODULES.find((m) => m.id === moduleId);
  const probs = ASSIGNMENTS[moduleId] ?? [];
  const [active, setActive] = useState(0);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(probs[0]?.starter ?? "");
  const [output, setOutput] = useState("");
  const [started, setStarted] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);
  const { progress, setProgress } = useApp();

  useEffect(() => { setCode(probs[active]?.starter ?? ""); }, [active, probs]);
  useEffect(() => () => cleanupRef.current?.(), []);
  if (!meta) return <Layout><p>Not found.</p></Layout>;

  const begin = () => { setStarted(true); cleanupRef.current = startMonitoring({ onTerminate: () => navigate("/dashboard") }); };
  const run = () => setOutput(`▶ Running ${language}…\n✔ Mock execution complete.`);
  const submit = () => {
    cleanupRef.current?.();
    const completed = Array.from(new Set([...progress.completedModules, moduleId]));
    const assignmentsDone = Array.from(new Set([...progress.assignmentsDone, moduleId]));
    setProgress({ ...progress, completedModules: completed, assignmentsDone });
    toast.success("Assignment submitted");
    navigate("/dashboard");
  };

  if (!started) return (
    <Layout>
      <div className="glass rounded-2xl p-8 max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-bold">{meta.title} — Monitored IDE</h1>
        <p className="text-muted-foreground mt-2">Fullscreen and proctoring activate when you start.</p>
        <Button size="lg" className="mt-8" onClick={begin}>Start Test</Button>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="grid lg:grid-cols-[2fr_3fr] gap-6">
        <div className="glass rounded-2xl p-5 h-[75vh] overflow-y-auto">
          <div className="flex gap-2 mb-4">
            {probs.map((_, i) => <button key={i} onClick={() => setActive(i)} className={`text-xs px-3 py-1.5 rounded-full border ${active === i ? "bg-primary text-primary-foreground border-primary" : "bg-white/60 border-border"}`}>Problem {i + 1}</button>)}
          </div>
          <h2 className="font-semibold text-lg">{probs[active].title}</h2>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{probs[active].description}</p>
          <div className="mt-4 text-sm bg-white/60 border border-border rounded-lg p-3 font-mono">{probs[active].example}</div>
        </div>
        <div className="glass rounded-2xl p-3 flex flex-col h-[75vh]">
          <div className="flex items-center justify-between gap-2 px-2 py-2">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2"><Button variant="outline" onClick={run}>Run</Button><Button onClick={submit}>Submit</Button></div>
          </div>
          <div className="flex-1 rounded-xl overflow-hidden border border-border">
            <Editor height="100%" language={language} value={code} onChange={(v) => setCode(v ?? "")} options={{ minimap: { enabled: false }, fontSize: 14, contextmenu: false }} theme="vs" />
          </div>
          <pre className="mt-3 text-xs bg-white/70 border border-border rounded-lg p-3 h-28 overflow-y-auto whitespace-pre-wrap">{output || "Output will appear here…"}</pre>
        </div>
      </div>
    </Layout>
  );
};
export default IDE;