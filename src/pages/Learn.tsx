import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { LEARNING, MODULES } from "@/lib/content";
import { ModuleId, useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";

const Learn = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setActiveModule, setCameFromModule } = useApp();
  const moduleId = id as ModuleId;
  const meta = MODULES.find((m) => m.id === moduleId);
  const data = LEARNING[moduleId];
  if (!meta || !data) return <Layout><p>Not found.</p></Layout>;
  const start = () => { setActiveModule(moduleId); setCameFromModule(true); navigate(`/practice/${moduleId}`); };
  return (
    <Layout>
      <SectionHeading eyebrow={meta.title} title="Learn the concepts" subtitle={data.intro} />
      <div className="grid md:grid-cols-2 gap-6">
        {data.sections.map((s) => (
          <div key={s.heading} className="glass rounded-2xl p-6">
            <h3 className="font-semibold mb-2">{s.heading}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
      <div className="glass rounded-2xl p-6 mt-6">
        <p className="text-sm uppercase tracking-widest text-primary/80 mb-2">Worked example</p>
        <p>{data.example}</p>
      </div>
      <div className="mt-8 flex justify-end"><Button size="lg" onClick={start}>Start Practice →</Button></div>
    </Layout>
  );
};
export default Learn;