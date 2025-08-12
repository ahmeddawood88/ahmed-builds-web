import SEO from "@/components/SEO";

const Resume = () => {
  const title = "Resume — Ahmed Dawood Al-Dulaimi";
  const description = "Product & Program Manager with PMP, PSM; 10+ years in software, agile delivery, and digital transformation.";

  return (
    <main>
      <SEO title={title} description={description} canonicalPath="/resume" />
      <section className="max-w-4xl mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Ahmed Dawood Al‑Dulaimi</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Product Manager | Program Manager | Tech Entrepreneur · PMP® · PSM® · AWS Certified AI Practitioner · UCSD Certified Product Manager
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
            Product Manager, PMP and PSM certified with 10+ years leading technical and non‑technical projects. Expertise in software product management, development, and agile implementation, especially Scrum. Co‑founder of IoT KIDS delivering scalable STEM programs.
          </p>

          <h2>Skill Highlights</h2>
          <ul>
            <li>Product Strategy & Roadmap Ownership; Agile Methodologies & Scrum</li>
            <li>Software Development & Prototyping; API Development & System Integration</li>
            <li>Product Documentation; Customer Feedback & User Research</li>
            <li>Stakeholder Engagement & Go‑to‑Market; Cross‑Functional Collaboration</li>
            <li>.NET Ecosystem; Full‑stack Development; SQL</li>
            <li>Jira & Confluence; Google Docs, GitHub, Figma, Balsamiq</li>
            <li>Entrepreneurship & Digital Transformation</li>
          </ul>

          <h2>Work Experience</h2>

          <h3>Program Manager — University of California, San Diego, Extended Studies (06/2024 – Present)</h3>
          <ul>
            <li>Lead multiple initiatives across technology and engineering programs informed by student and educator feedback.</li>
            <li>Bridge learners, instructors, and engineering teams for quality delivery and continuous improvement.</li>
            <li>Use platform insights to identify gaps and recommend enhancements; own documentation and materials.</li>
            <li>Collaborate with design, curriculum, marketing, and technical teams to launch AI/ML programs; supported by organizations like the Motorola Foundation.</li>
          </ul>

          <h3>Program Manager — Makers of Baghdad (05/2022 – 06/2024)</h3>
          <ul>
            <li>Directed product and software development for SMB/startup projects using agile frameworks and sprints.</li>
            <li>Gathered product requirements with cross‑functional teams; iterated quickly using Figma, Jira, Confluence.</li>
            <li>Integrated APIs and managed backends for ERP, CRM, Payment Gateways, and HR solutions.</li>
            <li>Managed deployments, triaged user issues, and prioritized usability improvements via feedback.</li>
            <li>Authored project proposals and led M&E and reporting to donors (USAID, U.S. Embassy).</li>
          </ul>

          <h3>Project Officer — GIZ (05/2021 – 05/2022)</h3>
          <ul>
            <li>Managed digital skills and technologies projects to create 200+ jobs in the digital economy.</li>
            <li>Supported partners launching impactful digital skills initiatives; delivered capacity‑building workshops.</li>
            <li>Conducted M&E evaluations, reviewed technical proposals, and supported local innovators.</li>
          </ul>

          <h3>Product Manager / Co‑founder — IoT Kids (07/2019 – 04/2021)</h3>
          <ul>
            <li>Pivoted to an e‑learning platform during COVID‑19; led product development and operations.</li>
            <li>Directed design and development of a scalable LMS and mobile learning app; used SQL/analytics to reduce churn.</li>
            <li>Managed feedback channels, created documentation and training materials; led scrum teams for timely iterations.</li>
            <li>Secured investment, drove B2B partnerships, and boosted retention via after‑sales strategies.</li>
          </ul>

          <h3>Software Development Lead — Cosmos Oasis (01/2018 – 06/2019)</h3>
          <ul>
            <li>Digitized operations and built systems that enhanced CX and growth.</li>
            <li>Launched booking and customer management systems; integrated payment gateway.</li>
            <li>Developed product documentation and user flows.</li>
          </ul>

          <h3>SAP Technical Consultant — Selatan Group (09/2014 – 02/2017)</h3>
          <ul>
            <li>Led development and delivery of SAP solutions; supported full‑cycle implementations.</li>
            <li>Pre‑sales, workshops, onboarding; delivered technical training and documentation.</li>
            <li>Used SQL and process analysis to tailor ERP modules.</li>
          </ul>

          <h3>Software Engineer — ICADAM Technologies (11/2011 – 09/2014)</h3>
          <ul>
            <li>Designed and implemented ERP modules for manufacturing clients; acted as product owner on internal systems.</li>
            <li>Enhanced deployment strategies, delivered documentation, and led user training.</li>
          </ul>

          <h2>Education</h2>
          <p>
            University Science of Malaysia (USM) — Bachelor of Computer Science (09/2011)
          </p>
          <p>Major: Information System Engineering · Minor: Management</p>

          <h2>Certifications</h2>
          <ul>
            <li>PMP — Project Management Institute (PMI)</li>
            <li>Product Management — University of California, San Diego (UCSD)</li>
            <li>PSM — Professional Scrum Master (Scrum.org)</li>
            <li>AWS Certified Cloud Practitioner</li>
            <li>AWS Certified AI Practitioner</li>
          </ul>
        </article>
      </section>
    </main>
  );
};

export default Resume;
