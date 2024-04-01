import { ContentKeys } from "../entities/ContentKeys";
import { YoutubeInfo_minimal } from "../entities/YoutubeInfo_minimal";
import useContentDisplayModeStore from "../storeContentDisplayMode";
import ContentCard_grid_PDF from "./ContentCards/ContentCard_grid_PDF";
import ContentCard_grid_YoutubeNotExists from "./ContentCards/ContentCard_grid_YoutubeNotExists";
import ContentCard_grid_YoutubeShort from "./ContentCards/ContentCard_grid_YoutubeShort";
import ContentCard_grid_YoutubeVideo from "./ContentCards/ContentCard_grid_YoutubeVideo";
import ContentCard_list_PDF from "./ContentCards/ContentCard_list_PDF";
import ContentCard_list_YoutubeNotExists from "./ContentCards/ContentCard_list_YoutubeNotExists";
import ContentCard_list_YoutubeShort from "./ContentCards/ContentCard_list_YoutubeShort";
import ContentCard_list_YoutubeVideo from "./ContentCards/ContentCard_list_YoutubeVideo";

interface Props {
  content: ContentKeys;
  youtubeInfo_minimal: YoutubeInfo_minimal;
}

const ContentCardRouter = ({
  content,
  youtubeInfo_minimal: youtubeInfo,
}: Props) => {
  const selectedContentDisplayMode = useContentDisplayModeStore(
    (s) => s.contentDisplayMode
  );

  const MODALITY_YOUTUBE_VIDEO = 1;
  const MODALITY_YOUTUBE_SHORT = 2;
  const MODALITY_PDF = 3;

  if (content.modality_id === MODALITY_YOUTUBE_VIDEO) {
    if (selectedContentDisplayMode.name === "grid") {
      if (youtubeInfo?.exists) {
        return (
          <ContentCard_grid_YoutubeVideo
            content={content}
            youtubeInfo={youtubeInfo}
          />
        );
      } else {
        return <ContentCard_grid_YoutubeNotExists content={content} />;
      }
    } else if (selectedContentDisplayMode.name === "list") {
      if (youtubeInfo?.exists) {
        return (
          <ContentCard_list_YoutubeVideo
            content={content}
            youtubeInfo={youtubeInfo}
          />
        );
      } else {
        return <ContentCard_list_YoutubeNotExists content={content} />;
      }
    }
  }

  if (content.modality_id === MODALITY_YOUTUBE_SHORT) {
    if (selectedContentDisplayMode.name === "grid") {
      if (youtubeInfo?.exists) {
        return (
          <ContentCard_grid_YoutubeShort
            content={content}
            youtubeInfo={youtubeInfo}
          />
        );
      } else {
        return <ContentCard_grid_YoutubeNotExists content={content} />;
      }
    } else if (selectedContentDisplayMode.name === "list") {
      if (youtubeInfo?.exists) {
        return (
          <ContentCard_list_YoutubeShort
            content={content}
            youtubeInfo={youtubeInfo}
          />
        );
      } else {
        return <ContentCard_list_YoutubeNotExists content={content} />;
      }
    }
  }

  if (content.modality_id === MODALITY_PDF) {
    if (selectedContentDisplayMode.name === "grid") {
      return <ContentCard_grid_PDF content={content} />;
    } else if (selectedContentDisplayMode.name === "list") {
      return <ContentCard_list_PDF content={content} />;
    }
  }

  return null;
};

export default ContentCardRouter;
