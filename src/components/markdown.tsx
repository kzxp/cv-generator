import { useMemo, type JSX } from "react";
import { buildGithubRawUrl } from "../helpers/github";

type MarkdownImageProps = JSX.IntrinsicElements["img"] & {
  baseUrl?: string;
};

const MarkdownImage = ({ src, baseUrl, ...props }: MarkdownImageProps) => {
  const imageUrl = useMemo(() => {
    if (!baseUrl || !src) return "";

    return buildGithubRawUrl(baseUrl, src);
  }, [src, baseUrl]);

  return imageUrl ? <img {...props} src={imageUrl} /> : null;
};

const MarkdownLink = ({ href, ...props }: JSX.IntrinsicElements["a"]) => {
  return <a {...props} href={href} target="_blank" rel="noopener noreferrer" />;
};

const isUrl = (text: string) => {
  try {
    new URL(text);
    return true;
  } catch {
    return false;
  }
};

const MarkdownText = ({ children }: React.PropsWithChildren) => {
  if (typeof children !== "string") return <>{children}</>;

  const words = children.split(" ");
  return (
    <span>
      {words.map((word, i) =>
        isUrl(word) ? (
          <MarkdownLink key={i} href={word}>
            {word}
          </MarkdownLink>
        ) : (
          <span key={i}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        )
      )}
    </span>
  );
};

const MarkdownList = ({ children }: React.PropsWithChildren) => {
  return (
    <li>
      <MarkdownText>{children}</MarkdownText>
    </li>
  );
};

const MarkdownParagraph = ({ children }: React.PropsWithChildren) => {
  return (
    <p>
      <MarkdownText>{children}</MarkdownText>
    </p>
  );
};

const Markdown = {
  img: MarkdownImage,
  a: MarkdownLink,
  li: MarkdownList,
  p: MarkdownParagraph,
};

export { Markdown };
