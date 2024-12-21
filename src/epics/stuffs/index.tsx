import { Link } from "vite-react-ssg";
import { fetchChallengeContents } from "../../services/challenges-lol";
import { StuffsContentWrapper } from "./content";
import { useLoaderData } from "react-router";

const Stuffs = () => {
  const challengeContents = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col py-4">
      {challengeContents.map((challengeContent, index) => (
        <div className="">
          <StuffsContentWrapper
            key={index}
            baseUrl={challengeContent.directoryUrl}
        >
          <h1 className="text-3xl font-bold">
            <Link to={`/stuffs/${challengeContent.name}`} className="no-underline hover:underline">
              {challengeContent.content.metadata.title}
            </Link>
          </h1>
          <p>{challengeContent.content.metadata.description}</p>
        {index < challengeContents.length - 1 && <hr className="mt-4 border-[#273c75] border-t-4" />}
        </StuffsContentWrapper>
        </div>
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
