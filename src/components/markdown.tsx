import { useMemo, type JSX } from "react";

type MarkdownImageProps = JSX.IntrinsicElements["img"] & {
  baseUrl?: string;
};

const MarkdownImage = ({ src, baseUrl, ...props }: MarkdownImageProps) => {
  const imageUrl = useMemo(() => {
    if (!baseUrl || !src) return "";

    return `https://raw.githubusercontent.com/${
      new URL([baseUrl, src!.replace("./", "")].join("/")).pathname
    }`.replace("/tree/", "/refs/heads/");
  }, [src, baseUrl]);

  return imageUrl ? <img {...props} src={imageUrl} /> : null;
};

const Markdown = {
  img: MarkdownImage,
};

export { Markdown };
