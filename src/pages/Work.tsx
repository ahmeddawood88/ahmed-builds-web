import SEO from "@/components/SEO";
import { Link } from "react-router-dom";

const Work = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "CreativeWork",
        position: 1,
        name: "UCSD Tech & Engineering Programs",
        description: "Program management for tech offerings; leveraging feedback to improve delivery and launch AI/ML programs.",
      },
      {
        "@type": "SoftwareApplication",
        position: 2,
        name: "ERP/CRM Integrations for Startups (Makers of Baghdad)",
        description: "API integrations and backend management across ERP, CRM, Payments, and HR systems.",
      },
      {
        "@type": "CreativeWork",
        position: 3,
        name: "IoT Kids LMS & Mobile Learning App",
        description: "Led the pivot to e‑learning; designed and shipped a scalable LMS and mobile learning experience.",
      },
      {
        "@type": "SoftwareApplication",
        position: 4,
        name: "Cosmos Oasis Booking & Payments",
        description: "Digitized operations with booking, customer management, and payment gateway integration.",
      },
    ],
  };

  return (
    <main>
      <SEO
        title="Sample of Work — Ahmed Dawood Al-Dulaimi"
        description="Selected projects spanning program management, product development, and platform integrations."
        canonicalPath="/work"
        structuredData={structuredData}
      />
      <section className="max-w-5xl mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Sample of Work</h1>
          <p className="mt-2 text-sm text-muted-foreground">A few representative initiatives based on my resume.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="glass-card p-6">
            <h2 className="text-xl font-semibold">UCSD Tech & Engineering Programs</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Managed initiatives informed by student and educator feedback. Collaborated across design, curriculum, and engineering to launch AI/ML programs and drive continuous improvement.
            </p>
          </article>

          <article className="glass-card p-6">
            <h2 className="text-xl font-semibold">ERP/CRM Integrations for Startups</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Directed product and software development, integrating APIs and managing backends for ERP, CRM, payment gateways, and HR solutions (Makers of Baghdad).
            </p>
          </article>

          <article className="glass-card p-6">
            <h2 className="text-xl font-semibold">IoT Kids LMS & Mobile App</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Led the pivot to e‑learning; shipped a scalable LMS and mobile learning app, using SQL/analytics to reduce churn and improve user experience.
            </p>
          </article>

          <article className="glass-card p-6">
            <h2 className="text-xl font-semibold">Cosmos Oasis Booking & Payments</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Digitized internal operations with booking/customer systems and payment gateway integration to enhance CX and growth.
            </p>
          </article>
        </div>

        <div className="mt-10 text-sm text-muted-foreground">
          <p>
            Full experience details are available in my <Link to="/resume" className="underline hover:no-underline">resume</Link>.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Work;
