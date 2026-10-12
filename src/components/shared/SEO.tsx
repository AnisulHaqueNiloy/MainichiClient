import { useEffect } from "react";

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  schema?: Record<string, any> | Array<Record<string, any>>;
}

const DEFAULT_TITLE =
  "Mainichi Halal Food Shop | 100% Certified Halal Groceries in Japan";
const DEFAULT_DESCRIPTION =
  "Order 100% certified Halal food, fresh halal meat, spices, basmati rice, and everyday groceries in Japan with fast nationwide delivery and Cash on Delivery (COD).";
const DEFAULT_KEYWORDS =
  "halal food japan, halal meat tokyo, halal grocery online japan, mainichi halal shop, halal spices japan, halal food delivery japan";
const DEFAULT_IMAGE = "https://mainichihalalshop.com/logo.png";
const BASE_URL = "https://mainichihalalshop.com";

function setOrCreateMeta(selector: string, attrName: string, attrValue: string, content: string) {
  let element = document.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setOrCreateLink(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

export const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
  schema,
}: SEOProps) => {
  useEffect(() => {
    // 1. Update Title
    const fullTitle = title
      ? `${title} | Mainichi Halal Food Shop`
      : DEFAULT_TITLE;
    document.title = fullTitle;

    // 2. Canonical and Full URL
    const fullUrl = url
      ? url.startsWith("http")
        ? url
        : `${BASE_URL}${url.startsWith("/") ? url : `/${url}`}`
      : window.location.href;

    // Full Image URL
    const fullImage = image
      ? image.startsWith("http")
        ? image
        : `${BASE_URL}${image.startsWith("/") ? image : `/${image}`}`
      : DEFAULT_IMAGE;

    // 3. Primary Meta Tags
    setOrCreateMeta('meta[name="description"]', "name", "description", description);
    setOrCreateMeta('meta[name="keywords"]', "name", "keywords", keywords);
    setOrCreateLink("canonical", fullUrl);

    // 4. Open Graph Tags
    setOrCreateMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    setOrCreateMeta('meta[property="og:description"]', "property", "og:description", description);
    setOrCreateMeta('meta[property="og:image"]', "property", "og:image", fullImage);
    setOrCreateMeta('meta[property="og:url"]', "property", "og:url", fullUrl);
    setOrCreateMeta('meta[property="og:type"]', "property", "og:type", type);
    setOrCreateMeta('meta[property="og:site_name"]', "property", "og:site_name", "Mainichi Halal Food Shop");

    // 5. Twitter Card Tags
    setOrCreateMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setOrCreateMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    setOrCreateMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setOrCreateMeta('meta[name="twitter:image"]', "name", "twitter:image", fullImage);

    // 6. Structured Data (Schema.org JSON-LD)
    const scriptId = "dynamic-seo-schema";
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (schema) {
      if (!scriptElement) {
        scriptElement = document.createElement("script");
        scriptElement.id = scriptId;
        scriptElement.type = "application/ld+json";
        document.head.appendChild(scriptElement);
      }
      scriptElement.text = JSON.stringify(schema);
    } else if (scriptElement) {
      scriptElement.remove();
    }

    return () => {
      // Optional cleanup on unmount: remove dynamic page-specific schema
      const dynamicScript = document.getElementById(scriptId);
      if (dynamicScript) {
        dynamicScript.remove();
      }
    };
  }, [title, description, keywords, image, url, type, schema]);

  return null;
};

export default SEO;

