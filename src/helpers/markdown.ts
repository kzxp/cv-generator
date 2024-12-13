const importJSXRuntime = async () => {
  return import.meta.env.DEV
    ? await import("react/jsx-dev-runtime")
    : await import("react/jsx-runtime");
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
