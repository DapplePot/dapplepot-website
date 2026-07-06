import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

// Assigns a stable, unique slug to each heading so the table of contents
// can link straight to a section. Reset per renderMarkdown() call.
let slugCounts = {};

function slugify(text) {
  const base = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  const count = slugCounts[base] || 0;
  slugCounts[base] = count + 1;
  return count === 0 ? base : `${base}-${count}`;
}

marked.use({
  gfm: true,
  breaks: false,
  renderer: {
    heading(token) {
      const text = this.parser.parseInline(token.tokens);
      const plainText = text.replace(/<[^>]+>/g, "");
      const id = slugify(plainText);
      return `<h${token.depth} id="${id}">${text}</h${token.depth}>`;
    },
  },
});

DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if (node.nodeName === "A") {
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener noreferrer");
  }
});

export function renderMarkdown(md) {
  if (!md) return "";
  slugCounts = {};
  const rawHtml = marked.parse(md, { async: false });
  return DOMPurify.sanitize(rawHtml, { ADD_ATTR: ["id", "target"] });
}

// Extracts h1/h2/h3 headings (id + text + level) from rendered HTML for a
// table-of-contents sidebar. Works both server-side (isomorphic-dompurify
// bundles a DOM implementation) and in the browser.
export function extractHeadings(html) {
  if (!html) return [];
  if (typeof DOMParser === "undefined") return extractHeadingsRegex(html);
  const doc = new DOMParser().parseFromString(html, "text/html");
  return Array.from(doc.querySelectorAll("h1, h2, h3")).map((el) => ({
    id: el.id,
    text: el.textContent,
    level: Number(el.tagName[1]),
  }));
}

// Server-side fallback when DOMParser is unavailable — used only when
// SSR-ing the blog post shell before hydration.
function extractHeadingsRegex(html) {
  const out = [];
  const re = /<h([1-3])\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    out.push({
      level: Number(m[1]),
      id: m[2],
      text: m[3].replace(/<[^>]+>/g, ""),
    });
  }
  return out;
}
