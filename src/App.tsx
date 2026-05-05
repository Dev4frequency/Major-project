import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/context/AppContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Assistant from "./pages/Assistant";
import Modules from "./pages/Modules";
import Learn from "./pages/Learn";
import Practice from "./pages/Practice";
import Assignment from "./pages/Assignment";
import IDE from "./pages/IDE";
import Dashboard from "./pages/Dashboard";
import Developers from "./pages/Developers";
import RequireAuth from "./components/RequireAuth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" richColors />
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="/assistant" element={<RequireAuth><Assistant /></RequireAuth>} />
            <Route path="/modules" element={<RequireAuth><Modules /></RequireAuth>} />
            <Route path="/learn/:id" element={<RequireAuth><Learn /></RequireAuth>} />
            <Route path="/practice/:id" element={<RequireAuth><Practice /></RequireAuth>} />
            <Route path="/assignment/:id" element={<RequireAuth><Assignment /></RequireAuth>} />
            <Route path="/ide/:id" element={<RequireAuth><IDE /></RequireAuth>} />
            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="/developers" element={<RequireAuth><Developers /></RequireAuth>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
