import { Card, CardBody, HStack, Heading, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ContentKeys } from "../../entities/ContentKeys";
import Like from "../Like/Like";

interface Props {
  content: ContentKeys;
  youtubeInfo: {
    thumbnail: string;
    duration: string;
  };
}

const ContentCard_grid_YoutubeShortExists = ({
  content,
  youtubeInfo,
}: Props) => {
  const contentLink = "/resources/" + content.slug;

  return (
    <Card>
      <Link to={contentLink}>
        <Image src={youtubeInfo.thumbnail} />
      </Link>
      <CardBody>
        <HStack justifyContent={"space-between"} marginBottom={3}>
          <HStack>
            <Like onClick={() => console.log("clicked LIKE")} />
            <Heading fontSize="18px">{youtubeInfo.duration}</Heading>
          </HStack>
        </HStack>
        <Heading fontSize="2xl">
          <Link to={contentLink}>{content.title}</Link>
        </Heading>
      </CardBody>
    </Card>
  );
};

export default ContentCard_grid_YoutubeShortExists;
