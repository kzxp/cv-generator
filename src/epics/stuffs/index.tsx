import { Link } from "vite-react-ssg";
import { fetchChallengeContents } from "../../services/challenges-lol";
import { StuffsContentWrapper } from "./content";
import { useLoaderData } from "react-router";

const Stuffs = () => {
  const challengeContents = useLoaderData<typeof loader>();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {challengeContents.map((challengeContent, index) => (
        <StuffsContentWrapper
          key={index}
          baseUrl={challengeContent.directoryUrl}
        >
          <h1>
            <Link to={`/stuffs/${challengeContent.name}`}>
              {challengeContent.content.metadata.title}
            </Link>
          </h1>
          <p>{challengeContent.content.metadata.description}</p>
        </StuffsContentWrapper>
      ))}
    </div>
  );
};

export default Stuffs;

export const Component = Stuffs;

export async function loader() {
  const challengeContents = await fetchChallengeContents();

  return challengeContents
}
