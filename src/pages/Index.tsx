import React, { useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Local SEO component (previously in src/components/SEO.tsx)
interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  structuredData?: Record<string, any>;
}

const SEO = ({ title, description, canonicalPath, image, structuredData }: SEOProps) => {
  const location = useLocation();

  useEffect(() => {
    document.title = title;

    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement('meta');
      desc.setAttribute('name', 'description');
      document.head.appendChild(desc);
    }
    desc.setAttribute('content', description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const href = canonicalPath ? `${window.location.origin}${canonicalPath}` : window.location.href;
    canonical.href = href;

    const ensureMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    ensureMeta('og:title', title);
    ensureMeta('og:description', description);
    ensureMeta('og:type', 'website');
    ensureMeta('og:url', href);
    if (image) ensureMeta('og:image', image);

    const ensureNameMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    ensureNameMeta('twitter:card', 'summary_large_image');
    ensureNameMeta('twitter:title', title);
    ensureNameMeta('twitter:description', description);
    if (image) ensureNameMeta('twitter:image', image);

    let jsonLd = document.getElementById('page-structured-data') as HTMLScriptElement | null;
    if (structuredData) {
      if (!jsonLd) {
        jsonLd = document.createElement('script');
        jsonLd.type = 'application/ld+json';
        jsonLd.id = 'page-structured-data';
        document.head.appendChild(jsonLd);
      }
      jsonLd.text = JSON.stringify(structuredData);
    } else if (jsonLd) {
      jsonLd.remove();
    }

    return () => {
      const existing = document.getElementById('page-structured-data');
      if (existing && location.pathname !== (canonicalPath || location.pathname)) {
        existing.remove();
      }
    };
  }, [title, description, canonicalPath, image, structuredData, location.pathname]);

  return null;
};

// Contact form
const CONTACT_EMAIL = "ahmed.d.aldulaimi@gmail.com";

const ContactSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().optional(),
  message: z.string().min(10, "Please provide a brief message (min 10 chars)."),
});

type ContactValues = z.infer<typeof ContactSchema>;

const Index = () => {
  const { toast } = useToast();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--x", `${x}%`);
    e.currentTarget.style.setProperty("--y", `${y}%`);
  }, []);

  const form = useForm<ContactValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = (values: ContactValues) => {
    const subject = values.subject && values.subject.trim().length > 0 ? values.subject : "General Inquiry";
    const body = `Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Contact: ${subject}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    toast({ title: "Thanks!", description: "Your email client should open—feel free to send your message." });
    form.reset();
  };

  return (
    <main>
      <SEO
        title="Ahmed Dawood Al-Dulaimi — Product Manager"
        description="PMP & PSM certified Product Manager building software products and programs. Explore About, Resume, and Work samples."
        canonicalPath="/"
      />

      {/* Hero */}
      <section className="spotlight">
        <div className="min-h-[60vh] flex items-center justify-center">
          <div onMouseMove={handleMouseMove} className="w-full">
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
              <h1 className="text-4xl font-bold">Ahmed Dawood Al‑Dulaimi</h1>
              <p className="mt-3 text-lg text-muted-foreground">Product Manager · Program Manager · Tech Entrepreneur</p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <Link to="/about" className="glass-card px-5 py-2 inline-block">About Me</Link>
                <Link to="/resume" className="border rounded-md px-5 py-2 inline-block hover:bg-accent transition-colors">My Resume</Link>
                <Link to="/work" className="border rounded-md px-5 py-2 inline-block hover:bg-accent transition-colors">Sample of Work</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Me */}
      <section id="contact" className="max-w-3xl mx-auto px-4 py-12">
        <header className="mb-6 text-center">
          <h2 className="text-2xl font-semibold">Contact Me</h2>
          <p className="mt-2 text-sm text-muted-foreground">Have a question or opportunity? Send me a message below.</p>
        </header>
        <div className="glass-card p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl><Input placeholder="Your name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="subject" render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject (optional)</FormLabel>
                  <FormControl><Input placeholder="What is this about?" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl><Textarea rows={6} placeholder="Write your message..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="flex items-center justify-end gap-3">
                <Button type="submit">Send Message</Button>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
};

// About page
export const About = () => {
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
    sameAs: ["https://www.linkedin.com/in/ahmed-dawood-salman"],
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
          <p className="mt-2 text-sm text-muted-foreground">PMP® · PSM® · AWS Certified AI Practitioner · UCSD Certified Product Manager</p>
          <div className="mt-3 text-sm text-muted-foreground">
            <p>CA, USA · +1 (951) 641‑7567 · <a className="underline hover:no-underline" href="mailto:ahmed.d.aldulaimi@gmail.com">ahmed.d.aldulaimi@gmail.com</a></p>
            <p><a className="underline hover:no-underline" href="https://www.linkedin.com/in/ahmed-dawood-salman" target="_blank" rel="noopener noreferrer">linkedin.com/in/ahmed-dawood-salman</a></p>
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

// Resume page
export const Resume = () => {
  const title = "Resume — Ahmed Dawood Al-Dulaimi";
  const description = "Product & Program Manager with PMP, PSM; 10+ years in software, agile delivery, and digital transformation.";

  return (
    <main>
      <SEO title={title} description={description} canonicalPath="/resume" />
      <section className="max-w-4xl mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Ahmed Dawood Al‑Dulaimi</h1>
          <p className="mt-1 text-sm text-muted-foreground">Product Manager | Program Manager | Tech Entrepreneur · PMP® · PSM® · AWS Certified AI Practitioner · UCSD Certified Product Manager</p>
          <div className="mt-3 text-sm text-muted-foreground">
            <p>CA, USA · +1 (951) 641‑7567 · <a className="underline hover:no-underline" href="mailto:ahmed.d.aldulaimi@gmail.com">ahmed.d.aldulaimi@gmail.com</a></p>
            <p><a className="underline hover:no-underline" href="https://www.linkedin.com/in/ahmed-dawood-salman" target="_blank" rel="noopener noreferrer">linkedin.com/in/ahmed-dawood-salman</a></p>
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
          <p>University Science of Malaysia (USM) — Bachelor of Computer Science (09/2011)</p>
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

// Work page
export const Work = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      { "@type": "CreativeWork", position: 1, name: "UCSD Tech & Engineering Programs", description: "Program management for tech offerings; leveraging feedback to improve delivery and launch AI/ML programs." },
      { "@type": "SoftwareApplication", position: 2, name: "ERP/CRM Integrations for Startups (Makers of Baghdad)", description: "API integrations and backend management across ERP, CRM, Payments, and HR systems." },
      { "@type": "CreativeWork", position: 3, name: "IoT Kids LMS & Mobile Learning App", description: "Led the pivot to e‑learning; designed and shipped a scalable LMS and mobile learning experience." },
      { "@type": "SoftwareApplication", position: 4, name: "Cosmos Oasis Booking & Payments", description: "Digitized operations with booking, customer management, and payment gateway integration." },
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
            <p className="mt-2 text-sm text-muted-foreground">Managed initiatives informed by student and educator feedback. Collaborated across design, curriculum, and engineering to launch AI/ML programs and drive continuous improvement.</p>
          </article>
          <article className="glass-card p-6">
            <h2 className="text-xl font-semibold">ERP/CRM Integrations for Startups</h2>
            <p className="mt-2 text-sm text-muted-foreground">Directed product and software development, integrating APIs and managing backends for ERP, CRM, payment gateways, and HR solutions (Makers of Baghdad).</p>
          </article>
          <article className="glass-card p-6">
            <h2 className="text-xl font-semibold">IoT Kids LMS & Mobile App</h2>
            <p className="mt-2 text-sm text-muted-foreground">Led the pivot to e‑learning; shipped a scalable LMS and mobile learning app, using SQL/analytics to reduce churn and improve user experience.</p>
          </article>
          <article className="glass-card p-6">
            <h2 className="text-xl font-semibold">Cosmos Oasis Booking & Payments</h2>
            <p className="mt-2 text-sm text-muted-foreground">Digitized internal operations with booking/customer systems and payment gateway integration to enhance CX and growth.</p>
          </article>
        </div>
        <div className="mt-10 text-sm text-muted-foreground">
          <p>Full experience details are available in my <Link to="/resume" className="underline hover:no-underline">resume</Link>.</p>
        </div>
      </section>
    </main>
  );
};

export default Index;
