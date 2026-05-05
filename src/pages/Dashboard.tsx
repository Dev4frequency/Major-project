import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { MCQS, MODULES } from "@/lib/content";
import { useApp } from "@/context/AppContext";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle } from "lucide-react";

const Dashboard = () => {
  const { progress, user } = useApp();
  const total = MODULES.length;
  const done = progress.completedModules.length;
  const overall = Math.round((done / total) * 100);
  return (
    <Layout>
      <SectionHeading eyebrow={user ? user.name : "Your journey"} title="Dashboard" subtitle="Modules, scores and overall progress." />
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="glass rounded-2xl p-6"><p className="text-sm text-muted-foreground">Modules completed</p><p className="text-3xl font-bold mt-1">{done}/{total}</p></div>
        <div className="glass rounded-2xl p-6"><p className="text-sm text-muted-foreground">Total MCQ score</p><p className="text-3xl font-bold mt-1">{Object.values(progress.scores).reduce((a, b) => a + b, 0)}</p></div>
        <div className="glass rounded-2xl p-6"><p className="text-sm text-muted-foreground">Overall progress</p><p className="text-3xl font-bold mt-1">{overall}%</p><Progress value={overall} className="mt-3" /></div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {MODULES.map((m) => {
          const s = progress.scores[m.id] ?? 0;
          const max = MCQS[m.id].length;
          const completed = progress.completedModules.includes(m.id);
          return (
            <div key={m.id} className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2">{completed ? <CheckCircle2 className="text-primary w-5 h-5" /> : <Circle className="text-muted-foreground w-5 h-5" />}<h3 className="font-semibold">{m.title}</h3></div>
              <p className="text-sm text-muted-foreground mt-1">MCQ score: {s}/{max}</p>
              <Progress value={(s / max) * 100} className="mt-3" />
            </div>
          );
        })}
      </div>
    </Layout>
  );
};
export default Dashboard;