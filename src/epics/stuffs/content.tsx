import { useMemo } from "react";
import { fetchChallengeReadme } from "../../services/challenges-lol";
import { Markdown } from "../../components/markdown";

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
      <div className="shadow-lg p-4">
        <StuffsContentWrapper baseUrl={baseUrl}>
          <Content.default components={components} />
        </StuffsContentWrapper>
      </div>
    )
  );
};

type StuffsContentWrapperProps = React.PropsWithChildren<{
  baseUrl?: string;
}>;

const StuffsContentWrapper = ({
  children,
  baseUrl,
}: StuffsContentWrapperProps) => {
  return (
    <article className="prose max-w-none p-2">
      <p className="float-right">
        <a
          href={baseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline hover:underline"
        >
          Source
        </a>
      </p>
      {children}
    </article>
  );
};

export { StuffsContentComponent, StuffsContentWrapper };
