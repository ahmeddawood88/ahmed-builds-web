import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
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
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: ContactValues) => {
    const subject = values.subject && values.subject.trim().length > 0
      ? values.subject
      : "General Inquiry";

    const body = `Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `Contact: ${subject}`
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    toast({
      title: "Thanks!",
      description: "Your email client should open—feel free to send your message.",
    });
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

      {/* Contact Me */}
      <section id="contact" className="max-w-3xl mx-auto px-4 py-12">
        <header className="mb-6 text-center">
          <h2 className="text-2xl font-semibold">Contact Me</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Have a question or opportunity? Send me a message below.
          </p>
        </header>
        <div className="glass-card p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="What is this about?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea rows={6} placeholder="Write your message..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

export default Index;
