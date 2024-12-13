import { Suspense, use, useMemo } from "react";
import { fetchChallengeReadme } from "../../services/challenges-lol";
import { Markdown } from "../../components/markdown";

type StuffsContentProps = {
  url: string;
  baseUrl?: string;
};

type StuffsContentComponentProps = {
  promise: ReturnType<typeof fetchChallengeReadme>;
  baseUrl?: string;
};

const StuffsContentComponent = ({
  promise,
  baseUrl,
}: StuffsContentComponentProps) => {
  const Context = use(promise);

  const components = useMemo(
    () => ({
      ...Markdown,
      img: (props: React.ComponentProps<typeof Markdown.img>) => (
        <Markdown.img {...props} baseUrl={baseUrl} />
      ),
    }),
    [baseUrl]
  );

  return (
    Context && <Context.default components={components} baseUrl={baseUrl} />
  );
};

const StuffsContent = ({ url, baseUrl }: StuffsContentProps) => {
  const promise = useMemo(() => fetchChallengeReadme(url), [url]);

  return (
    <Suspense fallback={<p>⌛Downloading content...</p>}>
      <StuffsContentComponent promise={promise} baseUrl={baseUrl} />
    </Suspense>
  );
};

export default StuffsContent;
