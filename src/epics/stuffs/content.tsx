import { useMemo } from "react";
import { fetchChallengeReadme } from "../../services/challenges-lol";
import { Markdown } from "../../components/markdown";
import { LoaderFunctionArgs } from "react-router";

type StuffsContentProps = {
  url: string;
  baseUrl?: string;
};

type StuffsContentComponentProps = {
  content: Awaited<ReturnType<typeof fetchChallengeReadme>>;
  baseUrl?: string;
};

const StuffsContentComponent = ({
  content: Content,
  baseUrl,
}: StuffsContentComponentProps) => {
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
    Content?.default && (
      <article className="prose max-w-none shadow-lg p-4">
        <p className="float-right">
          <a href={baseUrl} target="_blank" rel="noopener noreferrer">
            Link to repo
          </a>
        </p>
        <Content.default components={components} baseUrl={baseUrl} />
      </article>
    )
  );
};

const loader = async ({ params }: LoaderFunctionArgs<StuffsContentProps>) => {
  return fetchChallengeReadme(params.url!);
};

export { loader, StuffsContentComponent };
