import { Link, useLocation } from "react-router-dom";

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

export default SiteHeader;
