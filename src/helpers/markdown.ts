import * as productionRuntime from "react/jsx-runtime";

const importJSXRuntime = async () => {
  return import.meta.env.DEV
    ? import("react/jsx-dev-runtime")
    : productionRuntime;
};

const transformMarkdownToJSX = async (markdown: string) => {
  const runtime = await importJSXRuntime();
  const { evaluate } = await import("@mdx-js/mdx");

  return evaluate(markdown, {
    ...runtime,
    development: import.meta.env.DEV,
  });
};

export { transformMarkdownToJSX };
