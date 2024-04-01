import { Link } from "@chakra-ui/react";
import { YoutubeInfo_detailed } from "../entities/YoutubeInfo_detailed";
import DefinitionItem from "./DefinitionItem";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { ContentKeys } from "../entities/ContentKeys";

interface Props {
  content: ContentKeys;
  youtubeInfo: YoutubeInfo_detailed;
}

const ResourceAttributes_youtube = ({ content, youtubeInfo }: Props) => {
  return (
    <>
      <DefinitionItem term="Category">{content.topics_main_name}</DefinitionItem>
      <DefinitionItem term="Duration">{youtubeInfo.duration}</DefinitionItem>
      <DefinitionItem term="Views">{youtubeInfo.viewcount}</DefinitionItem>
      <DefinitionItem term="Youtube Channel">
        <Link
          href={"https://www.youtube.com/channel/" + youtubeInfo.channelId}
          style={{ paddingTop: "10px" }}
          rel="noopener noreferrer"
          isExternal
        >
          {youtubeInfo.channelTitle}{" "}
          <ExternalLinkIcon mx="2px" marginTop={-1} />
        </Link>
      </DefinitionItem>
    </>
  );
};

export default ResourceAttributes_youtube;
