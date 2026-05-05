import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, BookOpen, Code2, Terminal, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

const features = [
  { icon: Bot, title: "AI Assistant", desc: "Conceptual guidance — no spoilers.", to: "/assistant" },
  { icon: BookOpen, title: "Modules", desc: "DSA, Web Dev and JavaScript paths.", to: "/modules" },
  { icon: Code2, title: "Practice", desc: "Timed MCQs that gate assignments.", to: "/modules" },
  { icon: Terminal, title: "Monitored IDE", desc: "Build inside a proctored editor.", to: "/modules" },
];

const Home = () => {
  const navigate = useNavigate();
  const { user } = useApp();
  return (
    <Layout>
      <section className="py-12 md:py-20 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-primary/80">Guided. Monitored. Premium.</p>
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight">
          Welcome{user ? `, ${user.name.split(" ")[0]}` : ""} to <span className="text-gradient">Dev-Assistant</span>
        </motion.h1>
        <p className="mt-5 text-muted-foreground max-w-2xl mx-auto">A structured journey from concept → practice → assignment → IDE.</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button size="lg" onClick={() => navigate("/assistant")}>Start with AI <ArrowRight className="ml-1 w-4 h-4" /></Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/modules")}>Browse modules</Button>
        </div>
      </section>
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.button key={f.title} onClick={() => navigate(f.to)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="glass rounded-2xl p-6 text-left hover:-translate-y-1 transition-transform">
            <span className="w-10 h-10 rounded-xl grid place-items-center text-primary-foreground mb-4" style={{ background: "var(--gradient-primary)" }}>
              <f.icon className="w-5 h-5" />
            </span>
            <h3 className="font-semibold">{f.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
          </motion.button>
        ))}
      </section>
    </Layout>
  );
};
export default Home;