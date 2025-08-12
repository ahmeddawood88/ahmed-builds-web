import SEO from "@/components/SEO";

const About = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ahmed Dawood Al-Dulaimi",
    jobTitle: "Product Manager, Program Manager, Tech Entrepreneur",
    email: "mailto:ahmed.d.aldulaimi@gmail.com",
    telephone: "+1-951-641-7567",
    url: "https://www.linkedin.com/in/ahmed-dawood-salman",
    address: {
      "@type": "PostalAddress",
      addressRegion: "CA",
      addressCountry: "USA",
    },
    sameAs: [
      "https://www.linkedin.com/in/ahmed-dawood-salman"
    ],
  };

  return (
    <main>
      <SEO
        title="About Ahmed Dawood Al-Dulaimi"
        description="PMP & PSM certified Product Manager with 10+ years leading software products, agile delivery, and cross-functional teams."
        canonicalPath="/about"
        structuredData={structuredData}
      />
      <section className="max-w-3xl mx-auto px-4 py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">About Ahmed Dawood Al‑Dulaimi</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            PMP® · PSM® · AWS Certified AI Practitioner · UCSD Certified Product Manager
          </p>
          <div className="mt-3 text-sm text-muted-foreground">
            <p>CA, USA · +1 (951) 641‑7567 · <a className="underline hover:no-underline" href="mailto:ahmed.d.aldulaimi@gmail.com">ahmed.d.aldulaimi@gmail.com</a></p>
            <p>
              <a className="underline hover:no-underline" href="https://www.linkedin.com/in/ahmed-dawood-salman" target="_blank" rel="noopener noreferrer">linkedin.com/in/ahmed-dawood-salman</a>
            </p>
          </div>
        </header>

        <article className="prose-resume">
          <h2>Career Profile</h2>
          <p>
            Product Manager, Project Management Professional (PMP) and Professional Scrum Master (PSM) certified with over a decade of experience successfully leading technical and non-technical projects across a wide range of industries. Demonstrated expertise in software product management, product development, and agile implementation, especially within the Scrum framework. Co-founder of IoT KIDS, an EdTech startup that delivered scalable STEM programs for youth.
          </p>
          <p>
            Skilled at cross-functional collaboration, resolving product-related escalations, and using customer insights to guide product decisions. Strong documentation skills, a problem-solving mindset, and deep familiarity with Prototyping, APIs, SQL, and tools like Confluence, JIRA, GitHub, and Google Docs.
          </p>

          <h2>Skill Highlights</h2>
          <ul>
            <li>Product Strategy & Roadmap Ownership; Agile & Scrum</li>
            <li>Software Development, Prototyping, APIs & System Integration</li>
            <li>Customer Feedback, User Research, Documentation</li>
            <li>Stakeholder Engagement & Go‑to‑Market; Cross‑functional collaboration</li>
            <li>.NET Ecosystem; Full‑stack Development; SQL</li>
            <li>Jira, Confluence, GitHub, Figma, Balsamiq, Google Docs</li>
            <li>Entrepreneurship & Digital Transformation</li>
          </ul>
        </article>
      </section>
    </main>
  );
};

export default About;
