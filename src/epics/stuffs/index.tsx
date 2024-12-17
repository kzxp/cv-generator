import { fetchChallengeReadme, fetchChallenges } from "../../services/challenges-lol";
import {
  StuffsContentComponent,
} from "./content";
import { useLoaderData } from "react-router";

const Stuffs = () => {
  const challengeContentsHtml = useLoaderData<typeof loader>();

  return (
    <div
      className="flex flex-col gap-8"
      dangerouslySetInnerHTML={{ __html: challengeContentsHtml }}
    />
  );
};

export default Stuffs;

export const Component = Stuffs;

export async function loader() {
  const challenges = await fetchChallenges();
  const challengeContents = await Promise.all(
    challenges.map(async (challenge) => {
      const content = await fetchChallengeReadme(challenge.readmeUrl);
      return {
        ...challenge,
        content,
      };
    })
  );

  const { renderToString } = await import("react-dom/server");
  return renderToString(
    challengeContents.map((challengeContent, index) => (
      <StuffsContentComponent
        key={index}
        content={challengeContent.content}
        baseUrl={challengeContent.directoryUrl}
      />
    ))
  );
}
