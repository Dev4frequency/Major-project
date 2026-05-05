import { ReactNode } from "react";
import CherryBackground from "./CherryBackground";
import Navbar from "./Navbar";

const Layout = ({ children, hideNav = false }: { children: ReactNode; hideNav?: boolean }) => (
  <div className="min-h-screen relative">
    <CherryBackground />
    {!hideNav && <Navbar />}
    <main className="max-w-7xl mx-auto p-6">{children}</main>
  </div>
);

export default Layout;