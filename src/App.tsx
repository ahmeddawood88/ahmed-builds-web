import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Index, { About, Resume, Work } from "./pages/Index";

const queryClient = new QueryClient();

const navItems = [
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
  { to: "/work", label: "Sample of Work" },
];

const SiteHeader = () => {
  const location = useLocation();
  return (
    <header className="w-full border-b bg-background">
      <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between" aria-label="Primary">
        <Link to="/" className="font-semibold tracking-tight">
          Ahmed Dawood Al‑Dulaimi
        </Link>
        <ul className="flex items-center gap-6">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={
                    "text-sm transition-colors border-b-2 " +
                    (active
                      ? "text-primary border-primary"
                      : "text-muted-foreground border-transparent hover:text-foreground hover:border-foreground")
                  }
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

const NotFound = () => (
  <main className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-base text-muted-foreground mb-4">Oops! Page not found</p>
      <a href="/" className="underline hover:no-underline">Return to Home</a>
    </div>
  </main>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SiteHeader />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/work" element={<Work />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
