import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import cherry from "@/assets/cherry.gif";

export type User = {
  name: string;
  email: string;
  linkedin: string;
  leetcode: string;
};

export type ModuleId = "dsa" | "web" | "js";

export type Progress = {
  completedModules: ModuleId[];
  scores: Record<string, number>; // moduleId -> mcq score (out of 30)
  assignmentsDone: ModuleId[];
};

type Ctx = {
  user: User | null;
  setUser: (u: User | null) => void;
  progress: Progress;
  setProgress: (p: Progress) => void;
  activeModule: ModuleId | null;
  setActiveModule: (m: ModuleId | null) => void;
  cameFromModule: boolean;
  setCameFromModule: (b: boolean) => void;
};

const AppCtx = createContext<Ctx | null>(null);

const defaultProgress: Progress = {
  completedModules: [],
  scores: {},
  assignmentsDone: [],
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(() => {
    const raw = localStorage.getItem("dev-assistant-user");
    return raw ? JSON.parse(raw) : null;
  });
  const [progress, setProgressState] = useState<Progress>(() => {
    const raw = localStorage.getItem("dev-assistant-progress");
    return raw ? JSON.parse(raw) : defaultProgress;
  });
  const [activeModule, setActiveModule] = useState<ModuleId | null>(null);
  const [cameFromModule, setCameFromModule] = useState(false);

  const setUser = (u: User | null) => {
    setUserState(u);
    if (u) localStorage.setItem("dev-assistant-user", JSON.stringify(u));
    else localStorage.removeItem("dev-assistant-user");
  };
  const setProgress = (p: Progress) => {
    setProgressState(p);
    localStorage.setItem("dev-assistant-progress", JSON.stringify(p));
  };

  // Preload cherry gif
  useEffect(() => {
    const img = new Image();
    img.src = cherry;
  }, []);

  return (
    <AppCtx.Provider
      value={{ user, setUser, progress, setProgress, activeModule, setActiveModule, cameFromModule, setCameFromModule }}
    >
      {children}
    </AppCtx.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};