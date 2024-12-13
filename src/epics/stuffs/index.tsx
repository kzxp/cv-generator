import { useEffect, useState } from "react";
import { fetchChallenges } from "../../services/challenges-lol";
import StuffsContent from "./content";

const Stuffs = () => {
  const [contents, setContents] = useState<
    Awaited<ReturnType<typeof fetchChallenges>>
  >([]);

  useEffect(() => {
    const request = async () => {
      try {
        const challenges = await fetchChallenges();
        setContents(challenges);
      } catch (error) {
        console.error(error);
      }
    };
    request();
  }, []);

  return contents.map((content) => (
    <StuffsContent
      key={content.readmeUrl}
      url={content.readmeUrl}
      baseUrl={content.directoryUrl}
    />
  ));
};

export default Stuffs;
