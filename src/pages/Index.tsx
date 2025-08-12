import { useCallback } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const Index = () => {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--x", `${x}%`);
    e.currentTarget.style.setProperty("--y", `${y}%`);
  }, []);

  return (
    <main>
      <SEO
        title="Ahmed Dawood Al-Dulaimi — Product Manager"
        description="PMP & PSM certified Product Manager building software products and programs. Explore About, Resume, and Work samples."
        canonicalPath="/"
      />
      <section className="spotlight">
        <div className="min-h-[60vh] flex items-center justify-center">
          <div onMouseMove={handleMouseMove} className="w-full">
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
              <h1 className="text-4xl font-bold">Ahmed Dawood Al‑Dulaimi</h1>
              <p className="mt-3 text-lg text-muted-foreground">
                Product Manager · Program Manager · Tech Entrepreneur
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <Link to="/about" className="glass-card px-5 py-2 inline-block">
                  About Me
                </Link>
                <Link to="/resume" className="border rounded-md px-5 py-2 inline-block hover:bg-accent transition-colors">
                  My Resume
                </Link>
                <Link to="/work" className="border rounded-md px-5 py-2 inline-block hover:bg-accent transition-colors">
                  Sample of Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
