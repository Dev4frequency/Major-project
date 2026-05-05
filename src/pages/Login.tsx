import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CherryBackground from "@/components/CherryBackground";
import { useApp } from "@/context/AppContext";
import { Sparkles } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Name too short").max(60),
  email: z.string().trim().email("Invalid email").max(120),
  password: z.string().min(6, "Min 6 characters").max(64),
  linkedin: z.string().trim().url("Must be a URL").max(200),
  leetcode: z.string().trim().min(2, "Required").max(60),
});

const Login = () => {
  const { setUser } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", linkedin: "", leetcode: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setUser({ name: form.name, email: form.email, linkedin: form.linkedin, leetcode: form.leetcode });
    toast.success("Welcome to Dev-Assistant");
    navigate("/home");
  };

  return (
    <div className="min-h-screen relative grid place-items-center p-6">
      <CherryBackground />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-strong rounded-3xl p-8 md:p-10 w-full max-w-md"
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="w-9 h-9 rounded-xl grid place-items-center text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
            <Sparkles className="w-4 h-4" />
          </span>
          <h1 className="text-2xl font-bold text-gradient">Dev-Assistant</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-6">Sign in to start your guided learning journey.</p>
        <form onSubmit={submit} className="space-y-4">
          {([
            ["name", "Full name", "text", "Ada Lovelace"],
            ["email", "Email", "email", "you@domain.com"],
            ["password", "Password", "password", "••••••••"],
            ["linkedin", "LinkedIn URL", "url", "https://linkedin.com/in/..."],
            ["leetcode", "LeetCode handle", "text", "ada_codes"],
          ] as const).map(([key, label, type, ph]) => (
            <div key={key} className="space-y-1.5">
              <Label htmlFor={key}>{label}</Label>
              <Input
                id={key}
                type={type}
                placeholder={ph}
                value={(form as any)[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            </div>
          ))}
          <Button type="submit" className="w-full" size="lg">Continue</Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;