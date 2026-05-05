import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MCQS, MODULES } from "@/lib/content";
import { ModuleId, useApp } from "@/context/AppContext";
import { startMonitoring } from "@/lib/monitoring";

const TOTAL_TIME = 30 * 60;
const Practice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const moduleId = id as ModuleId;
  const meta = MODULES.find((m) => m.id === moduleId);
  const { cameFromModule, progress, setProgress } = useApp();
  const questions = useMemo(() => MCQS[moduleId] ?? [], [moduleId]);
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>(() => Array(questions.length).fill(-1));
  const [time, setTime] = useState(TOTAL_TIME);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => { if (!cameFromModule) { toast.error("Start practice from a module."); navigate("/modules"); } }, [cameFromModule, navigate]);

  const finish = useCallback(() => {
    cleanupRef.current?.();
    const score = answers.reduce((acc, a, i) => acc + (a === questions[i].answer ? 1 : 0), 0);
    setProgress({ ...progress, scores: { ...progress.scores, [moduleId]: score } });
    toast.success(`Score: ${score}/${questions.length}`);
    navigate(`/assignment/${moduleId}`);
  }, [answers, questions, progress, setProgress, moduleId, navigate]);

  useEffect(() => { if (!started) return; const t = setInterval(() => setTime((s) => (s > 0 ? s - 1 : 0)), 1000); return () => clearInterval(t); }, [started]);
  useEffect(() => { if (started && time === 0) finish(); }, [time, started, finish]);
  useEffect(() => () => { cleanupRef.current?.(); }, []);

  const begin = () => { setStarted(true); cleanupRef.current = startMonitoring({ onTerminate: () => navigate("/dashboard") }); };
  if (!meta) return <Layout><p>Not found.</p></Layout>;

  if (!started) return (
    <Layout>
      <div className="glass rounded-2xl p-8 max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-bold">{meta.title} — Practice</h1>
        <p className="text-muted-foreground mt-2">30 questions · 30 minutes · Monitored</p>
        <ul className="text-sm text-left mt-6 space-y-2 text-muted-foreground">
          <li>• Fullscreen enforced.</li><li>• Tab switch / copy-paste blocked.</li><li>• 3 violations terminate the test.</li>
        </ul>
        <Button size="lg" className="mt-8" onClick={begin}>Enter monitored test</Button>
      </div>
    </Layout>
  );

  const q = questions[idx];
  const min = String(Math.floor(time / 60)).padStart(2, "0");
  const sec = String(time % 60).padStart(2, "0");
  return (
    <Layout>
      <div className="glass rounded-2xl p-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">Question {idx + 1} / {questions.length}</p>
          <p className="font-mono text-primary">{min}:{sec}</p>
        </div>
        <Progress value={((idx + 1) / questions.length) * 100} className="mb-6" />
        <h2 className="text-lg font-semibold">{q.q}</h2>
        <div className="mt-5 space-y-2">
          {q.options.map((opt, i) => (
            <button key={i} onClick={() => { const a = [...answers]; a[idx] = i; setAnswers(a); }} className={`block w-full text-left px-4 py-3 rounded-xl border transition-colors ${answers[idx] === i ? "border-primary bg-primary/10" : "border-border bg-white/50 hover:bg-white"}`}>{opt}</button>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <Button variant="outline" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>Previous</Button>
          {idx < questions.length - 1 ? <Button onClick={() => setIdx(idx + 1)}>Next</Button> : <Button onClick={finish}>Submit</Button>}
        </div>
      </div>
    </Layout>
  );
};
export default Practice;