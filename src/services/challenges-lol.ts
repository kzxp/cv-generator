import { transformMarkdownToJSX } from "../helpers/markdown";

type ChallengesResponse = {
  name: string;
  directoryUrl: string;
  readmeUrl: string;
};

const fetchChallenges = async () => {
  const response = await fetch(
    "https://kzxp.github.io/challenges-lol/readme.json"
  );
  return response.json() as Promise<ChallengesResponse[]>;
};

const fetchChallengeReadme = async (url: string) => {
  const response = await fetch(url);
  const data = await response.text();
  const jsx = await transformMarkdownToJSX(data);
  return jsx;
};

export { fetchChallenges, fetchChallengeReadme };
