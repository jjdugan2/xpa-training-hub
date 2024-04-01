import { TimeIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardBody,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ContentKeys } from "../../entities/ContentKeys";
import ContentCard_seeRelated from "../ContentCard_seeRelated";

interface Props {
  content: ContentKeys;
  youtubeInfo: {
    thumbnail: string;
    duration: string;
  };
}

const ContentCard_grid_YoutubeVideo = ({ content, youtubeInfo }: Props) => {
  const contentLink = "/resources/" + content.slug;

  return (
    <Card boxShadow="none" variant={"filled"}>
      <Box
        maxH="320px"
        display="flex"
        justifyContent="center"
        backgroundColor="black"
      >
        <Link to={contentLink}>
          <Image maxH="320px" src={youtubeInfo.thumbnail} />
        </Link>
      </Box>
      <CardBody py="3" px={"3"}>
        <HStack spacing="5px" color={"gray.500"}>
          <Icon as={TimeIcon} boxSize={3} />
          <Text fontSize={"12px"}>{youtubeInfo.duration}</Text>
          <ContentCard_seeRelated content={content} />
        </HStack>
        <Heading py="2" size={"md"}>
          <Link to={contentLink}>{content.title}</Link>
        </Heading>
        <Text hidden py="2">
          {content.description}
        </Text>
      </CardBody>
    </Card>
  );
};

export default ContentCard_grid_YoutubeVideo;
