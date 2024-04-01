import { Heading } from "@chakra-ui/react";
import { ContentKeys } from "../entities/ContentKeys";

interface Props {
  content: ContentKeys;
}

const ContentHeading_ResourcePage = ({ content }: Props) => {
  const heading = `${content.title || ""}`;

  return (
    <Heading as={"h1"} marginY={5} size={"lg"}>
      {heading}
    </Heading>
  );
};

export default ContentHeading_ResourcePage;
