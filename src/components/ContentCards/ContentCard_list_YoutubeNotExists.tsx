import { Box, Card, CardBody, Heading, Image } from "@chakra-ui/react";
import { ContentKeys } from "../../entities/ContentKeys";
import noYoutubeThumbnail from "../../assets/noImageYoutube.webp";

interface Props {
  content: ContentKeys;
}

const ContentCard_list_YoutubeNotExists = ({ content }: Props) => {
  return (
    <Card
      variant={"filled"}
      boxShadow="none"
      borderWidth={"0px"}
      direction={{ base: "column", sm: "row" }}
    >
      <Box
        maxH="320px"
        maxW={300}
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
