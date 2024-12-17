import { fetchChallenges } from "../../services/challenges-lol";
import {
  StuffsContentComponent,
  loader as stuffsContentLoader,
} from "./content";
import { useLoaderData } from "react-router";

const Stuffs = () => {
  const { challengeContentsHtml } = useLoaderData<typeof loader>();

  return (
    <div
      className="flex flex-col gap-8"
      dangerouslySetInnerHTML={{ __html: challengeContentsHtml }}
    />
  );
};

export default Stuffs;

export const Component = Stuffs;

export const entry = "src/epics/stuffs/index.tsx";

export async function loader() {
  const challenges = await fetchChallenges();
  const challengeContents = await Promise.all(
    challenges.map(async (challenge) => ({
      ...challenge,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      content: await stuffsContentLoader({
        params: { url: challenge.readmeUrl },
      }),
    }))
  );

  const { renderToString } = await import("react-dom/server");
  return {
    challengeContentsHtml: renderToString(
      challengeContents.map((challengeContent, index) => (
        <StuffsContentComponent
          key={index}
          content={challengeContent.content}
          baseUrl={challengeContent.directoryUrl}
        />
      ))
    ),
  };
}
