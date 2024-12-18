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

const Markdown = {
  img: MarkdownImage,
  a: MarkdownLink,
};

export { Markdown };
