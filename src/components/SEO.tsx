import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
    // Title
    document.title = title;

    // Meta description
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement('meta');
      desc.setAttribute('name', 'description');
      document.head.appendChild(desc);
    }
    desc.setAttribute('content', description);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const href = canonicalPath
      ? `${window.location.origin}${canonicalPath}`
      : window.location.href;
    canonical.href = href;

    // Open Graph
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

    // Twitter
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

    // JSON-LD structured data
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
      // Clean up JSON-LD on route change to avoid stale data
      const existing = document.getElementById('page-structured-data');
      if (existing && location.pathname !== (canonicalPath || location.pathname)) {
        existing.remove();
      }
    };
  }, [title, description, canonicalPath, image, structuredData, location.pathname]);

  return null;
};

export default SEO;
