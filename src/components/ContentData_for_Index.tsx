import { useCallback, useEffect, useState } from "react";
import { ContentKeys } from "../entities/ContentKeys";
import useYoutubeInfo_minimal, {
  YoutubeInfo,
} from "../hooks/useYoutubeInfo_minimal";
import ContentCardRouter from "./ContentCardRouter";
import formatDuration from "./YoutubeElements/YoutubeDuration";
import noYoutubeThumbnail from "../assets/noImageYoutube.webp";

interface Props {
  content: ContentKeys;
}

const ContentData_for_Index = ({ content }: Props) => {
  const [youtubeInfo, setYoutubeInfo] = useState({
    exists: 0,
    thumbnail: "",
    duration: "",
  });

  const extractYoutubeInfo = useCallback((data: YoutubeInfo[]) => {
    if (data && data.length > 0) {
      const { snippet, contentDetails } = data[0];
      if (snippet?.thumbnails && contentDetails) {
        let thumbnailUrl =
          snippet?.thumbnails?.maxres?.url ??
          snippet?.thumbnails?.standard?.url ??
          snippet?.thumbnails?.high?.url ??
          snippet?.thumbnails?.medium?.url ??
          noYoutubeThumbnail;

        let duration = formatDuration(contentDetails.duration);

        setYoutubeInfo({
          exists: 1,
          thumbnail: thumbnailUrl,
          duration: duration,
        });
      }
    }
  }, []);

  const youtubeInfoRaw =
    content.modality_id === 1 || content.modality_id === 2
      ? useYoutubeInfo_minimal(content.video_id)
      : { data: null };

  useEffect(() => {
    extractYoutubeInfo(youtubeInfoRaw.data?.items || []);
  }, [content.modality_id, youtubeInfoRaw.data?.items, extractYoutubeInfo]);

  return (
    <ContentCardRouter content={content} youtubeInfo_minimal={youtubeInfo} />
  );
};

export default ContentData_for_Index;
