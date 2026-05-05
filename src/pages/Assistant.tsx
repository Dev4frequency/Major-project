import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, User as UserIcon, Send } from "lucide-react";

type Msg = { role: "user" | "ai"; content: string; topics?: string[] };
const intro: Msg = { role: "ai", content: "Hi! Try: 'I want to learn DSA', 'Web Dev', or 'JavaScript'." };

function respond(input: string): Msg {
  const t = input.toLowerCase();
  if (t.includes("dsa") || t.includes("data structure")) return { role: "ai", content: "DSA: start with arrays → searching → sorting → recursion. Concepts only.", topics: ["Arrays", "Sorting", "Searching", "Recursion"] };
  if (t.includes("web")) return { role: "ai", content: "Web Dev: HTML, CSS, JS and React. Semantic markup, layout, components, APIs.", topics: ["HTML", "CSS", "React", "APIs"] };
  if (t.includes("javascript") || t.includes("js")) return { role: "ai", content: "JS: types, closures, promises, event loop.", topics: ["Types", "Closures", "Promises", "Event loop"] };
  return { role: "ai", content: "I can guide DSA, Web Dev or JavaScript. Which one?" };
}

const Assistant = () => {
  const [messages, setMessages] = useState<Msg[]>([intro]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: "user", content: input.trim() }, respond(input)]);
    setInput("");
  };
  return (
    <Layout>
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="glass rounded-2xl flex flex-col h-[70vh]">
          <div className="p-5 border-b border-border/60 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg grid place-items-center text-primary-foreground" style={{ background: "var(--gradient-primary)" }}><Bot className="w-4 h-4" /></span>
            <div><h2 className="font-semibold">AI Learning Assistant</h2><p className="text-xs text-muted-foreground">Concepts only.</p></div>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "ai" && <div className="w-8 h-8 rounded-lg grid place-items-center bg-primary/10 text-primary shrink-0"><Bot className="w-4 h-4" /></div>}
                <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-white/70 border border-border"}`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                  {m.topics && (
                    <div className="mt-3 space-y-2">
                      <div className="flex flex-wrap gap-1.5">{m.topics.map((t) => <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{t}</span>)}</div>
                      <Button size="sm" onClick={() => navigate("/modules")}>Start Learning →</Button>
                    </div>
                  )}
                </div>
                {m.role === "user" && <div className="w-8 h-8 rounded-lg grid place-items-center bg-accent text-accent-foreground shrink-0"><UserIcon className="w-4 h-4" /></div>}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form onSubmit={send} className="p-4 border-t border-border/60 flex gap-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about DSA, Web Dev or JS…" />
            <Button type="submit" size="icon"><Send className="w-4 h-4" /></Button>
          </form>
        </div>
        <aside className="glass rounded-2xl p-5 space-y-3 h-fit">
          <h3 className="font-semibold">Try asking</h3>
          {["I want to learn DSA", "Teach me Web Development", "Start with JavaScript"].map((s) => (
            <button key={s} onClick={() => setInput(s)} className="block w-full text-left text-sm px-3 py-2 rounded-lg bg-white/60 hover:bg-white border border-border">{s}</button>
          ))}
        </aside>
      </div>
    </Layout>
  );
};
export default Assistant;