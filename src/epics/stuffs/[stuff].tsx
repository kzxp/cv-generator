import { LoaderFunctionArgs, Navigate, useLoaderData } from "react-router";
import {
  fetchChallengeContents,
  fetchChallenges,
} from "../../services/challenges-lol";
import { StuffsContentComponent } from "./content";
import { Link } from "vite-react-ssg";

const Stuff = () => {
  const challengeContentsHtml = useLoaderData<typeof loader>();

  if (!challengeContentsHtml) {
    return <Navigate to="/stuffs" />;
  }

  return (
    <div className="flex flex-wrap">
      <div className="mr-8 p-8 pl-0">
        <Link className="text-[#273c75] text-xl font-bold p-4" to="/stuffs">
          {"< Back"}
        </Link>
      </div>
      <div
        className="flex-1 w-full"
        dangerouslySetInnerHTML={{ __html: challengeContentsHtml }}
      />
    </div>
  );
};

export default Stuff;

export const Component = Stuff;

export async function loader({ params }: LoaderFunctionArgs) {
  const challengeContents = await fetchChallengeContents();

  const { renderToString } = await import("react-dom/server");

  const challengeContent =
    challengeContents.find((challenge) => challenge.name === params.id) || null;

  if (!challengeContent) {
    return null;
  }

  return renderToString(
    <StuffsContentComponent
      content={challengeContent.content}
      baseUrl={challengeContent.directoryUrl}
    />
  );
}

export async function getStaticPaths() {
  const challenges = await fetchChallenges();
  return challenges.map((challenge) => challenge.name);
}
