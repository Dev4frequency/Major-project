import { Link, NavLink, useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/home", label: "Home" },
  { to: "/assistant", label: "AI Assistant" },
  { to: "/modules", label: "Modules" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/developers", label: "Developers" },
];

const Navbar = () => {
  const { user, setUser } = useApp();
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 pt-4">
        <nav className="glass rounded-2xl px-5 py-3 flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-2 font-semibold">
            <span className="w-8 h-8 rounded-xl grid place-items-center text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-gradient text-lg">Dev-Assistant</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    isActive ? "bg-primary/10 text-primary" : "text-foreground/70 hover:text-foreground"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground hidden sm:inline">{user.name}</span>
                <Button variant="outline" size="sm" onClick={() => { setUser(null); navigate("/"); }}>
                  Logout
                </Button>
              </>
            ) : (
              <Button size="sm" onClick={() => navigate("/")}>Sign in</Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;