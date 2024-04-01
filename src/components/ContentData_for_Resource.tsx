import { useEffect, useState, useCallback } from "react";
import { ContentKeys } from "../entities/ContentKeys";
import useYoutubeInfo_detailed, {
  YoutubeInfo,
} from "../hooks/useYoutubeInfo_detailed";
import formatDuration from "./YoutubeElements/YoutubeDuration";
import formatViewcount from "./YoutubeElements/YoutubeViewcount";
import ResourceDetails from "./ResourceDetails";

interface Props {
  content: ContentKeys;
}

const ContentData_for_Resource = ({ content }: Props) => {
  const [youtubeInfo, setYoutubeInfo] = useState({
    channelTitle: "",
    channelId: "",
    title: "",
    description: "",
    thumbnail: "",
    duration: "",
    viewcount: "",
  });

  const extractYoutubeInfo = useCallback((data: YoutubeInfo[]) => {
    if (data && data.length > 0) {
      const { snippet, contentDetails, statistics } = data[0];
      if (snippet && contentDetails && statistics) {
        let thumbnailUrl =
          snippet?.thumbnails?.maxres?.url ??
          snippet?.thumbnails?.standard?.url ??
          snippet?.thumbnails?.high?.url ??
          snippet?.thumbnails?.medium?.url ??
          "";

        let duration = formatDuration(contentDetails.duration);
        let viewCount = formatViewcount(statistics.viewCount);

        setYoutubeInfo({
          channelTitle: snippet.channelTitle,
          channelId: snippet.channelId,
          title: snippet.title,
          description: snippet.description,
          thumbnail: thumbnailUrl,
          duration: duration,
          viewcount: viewCount,
        });
      }
    }
  }, []);

  const youtubeInfoRaw = useYoutubeInfo_detailed(content.video_id);

  useEffect(() => {
    extractYoutubeInfo(youtubeInfoRaw.data?.items || []);
  }, [content.modality_id, youtubeInfoRaw.data?.items, extractYoutubeInfo]);

  return (
    <ResourceDetails content={content} youtubeInfo_detailed={youtubeInfo} />
  );
};

export default ContentData_for_Resource;
