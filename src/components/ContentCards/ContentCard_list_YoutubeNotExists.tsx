import { Box, Card, CardBody, Heading, Image } from "@chakra-ui/react";
import { ContentKeys } from "../../entities/ContentKeys";
import noYoutubeThumbnail from "../../assets/noImageYoutube.webp";
import { useEffect, useState } from "react";

interface Props {
  content: ContentKeys;
}

const ContentCard_list_YoutubeNotExists = ({ content }: Props) => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    setFadeIn(true);
  }, []);

  return (
    <Card
      variant={"filled"}
      boxShadow="none"
      borderWidth={"0px"}
      direction={{ base: "column", sm: "row" }}
      opacity={fadeIn ? 1 : 0} // Set opacity based on fade-in state
      transition="opacity 0.5s" // Apply transition effect to opacity changes
    >
      <Box
        maxH="320px"
        maxW={{ base: "100%", sm: 300 }}
        display="flex"
        justifyContent="center"
        backgroundColor="black"
      >
        <Image src={noYoutubeThumbnail} />
      </Box>
      <CardBody>
        <Heading size={"md"} marginBottom={3}>
          {content.title}
        </Heading>
        <Heading size={"md"} color={"red"}>
          No longer available
        </Heading>
      </CardBody>
    </Card>
  );
};

export default ContentCard_list_YoutubeNotExists;
