
import React, { useEffect } from 'react';
import { BRAND } from '../constants';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article' | 'service';
  schema?: object;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords = [], 
  image = "https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=1200", 
  type = 'website',
  schema,
  noindex = false
}) => {
  useEffect(() => {
    // Update Title
    document.title = title;

    // Helper to update meta tags
    const updateMeta = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update Standard Meta
    updateMeta('description', description);
    updateMeta('keywords', keywords.join(', '));
    updateMeta('author', BRAND.fullName);
    updateMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Update Open Graph (Facebook/LinkedIn)
    updateMeta('og:title', title, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:image', image, 'property');
    updateMeta('og:type', type, 'property');
    updateMeta('og:site_name', BRAND.name, 'property');
    updateMeta('og:url', window.location.href, 'property');

    // Update Twitter Card
    updateMeta('twitter:card', 'summary_large_image', 'name');
    updateMeta('twitter:title', title, 'name');
    updateMeta('twitter:description', description, 'name');
    updateMeta('twitter:image', image, 'name');

    // Canonical Link
    let linkCanonical = document.querySelector("link[rel='canonical']");
    if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', window.location.href);

    // Inject Schema.org JSON-LD
    if (schema) {
      let script = document.querySelector('#dynamic-schema');
      if (!script) {
        script = document.createElement('script');
        script.id = 'dynamic-schema';
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    }

    return () => {
      // Cleanup schema on unmount/change
      const script = document.querySelector('#dynamic-schema');
      if (script) script.remove();
    };
  }, [title, description, keywords, image, type, schema, noindex]);

  return null;
};

export default SEO;
