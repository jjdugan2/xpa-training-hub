import { Box, Card, CardBody, Heading, Image } from "@chakra-ui/react";
import { ContentKeys } from "../../entities/ContentKeys";
import noYoutubeThumbnail from "../../assets/noImageYoutube.webp";

interface Props {
  content: ContentKeys;
}

const ContentCard_grid_YoutubeNotExists = ({ content }: Props) => {
  return (
    <Card boxShadow="none" variant={"filled"}>
      <Box
        maxH="320px"
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

export default ContentCard_grid_YoutubeNotExists;
