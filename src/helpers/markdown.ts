import * as productionRuntime from "react/jsx-runtime";

const importJSXRuntime = async () => {
  return import.meta.env.DEV
    ? import("react/jsx-dev-runtime")
    : productionRuntime;
};

const extractMetadata = (markdown: string) => {
  let title = "";
  let description = "";

  const lines = markdown.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for title (h1)
    if (!title && line.match(/^#\s+(.+)$/)) {
      title = line.replace(/^#\s+/, '');
    }
    
    // Check for first paragraph after title
    if (!description && title && line.trim() && !line.startsWith('#')) {
      description = line.trim();
    }

    // Break early if we found both
    if (title && description) break;
  }

  return {
    title,
    description
  };
};

const transformMarkdownToJSX = async (markdown: string) => {
  const runtime = await importJSXRuntime();
  const { evaluate } = await import("@mdx-js/mdx");

  const metadata = extractMetadata(markdown);
  const content = await evaluate(markdown, {
    ...runtime,
    development: import.meta.env.DEV,
  });

  return {
    ...content,
    metadata,
  };
};

export { transformMarkdownToJSX };
