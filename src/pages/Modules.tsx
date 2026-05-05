import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { MODULES } from "@/lib/content";
import { useApp } from "@/context/AppContext";
import { CheckCircle2, ArrowRight } from "lucide-react";

const Modules = () => {
  const navigate = useNavigate();
  const { progress, setActiveModule } = useApp();
  return (
    <Layout>
      <SectionHeading eyebrow="Step 1" title="Choose a module" subtitle="learn → practice → assignment → IDE." />
      <div className="grid md:grid-cols-3 gap-6">
        {MODULES.map((m) => {
          const done = progress.completedModules.includes(m.id);
          return (
            <button key={m.id} onClick={() => { setActiveModule(m.id); navigate(`/learn/${m.id}`); }} className="glass rounded-2xl p-6 text-left hover:-translate-y-1 transition-transform">
              <div className={`h-32 rounded-xl mb-5 bg-gradient-to-br ${m.color}`} />
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-lg">{m.title}</h3>
                {done && <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{m.tagline}</p>
              <div className="mt-5 inline-flex items-center text-sm text-primary font-medium">Begin <ArrowRight className="ml-1 w-4 h-4" /></div>
            </button>
          );
        })}
      </div>
    </Layout>
  );
};
export default Modules;