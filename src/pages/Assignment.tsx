import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { ASSIGNMENTS, MODULES } from "@/lib/content";
import { ModuleId } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";

const Assignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const moduleId = id as ModuleId;
  const meta = MODULES.find((m) => m.id === moduleId);
  const probs = ASSIGNMENTS[moduleId] ?? [];
  if (!meta) return <Layout><p>Not found.</p></Layout>;
  return (
    <Layout>
      <SectionHeading eyebrow={meta.title} title="Coding assignment" subtitle="Solve both problems in the monitored IDE." />
      <div className="grid md:grid-cols-2 gap-6">
        {probs.map((p, i) => (
          <div key={i} className="glass rounded-2xl p-6">
            <p className="text-xs text-primary uppercase tracking-widest">Problem {i + 1}</p>
            <h3 className="font-semibold text-lg mt-1">{p.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.description}</p>
            <div className="mt-3 text-sm bg-white/60 border border-border rounded-lg p-3 font-mono">{p.example}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-end"><Button size="lg" onClick={() => navigate(`/ide/${moduleId}`)}>Open IDE →</Button></div>
    </Layout>
  );
};
export default Assignment;