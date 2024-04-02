import { useQuery } from "@tanstack/react-query";
import APIClient, { endpoint_youtube } from "../services/api-client";

const apiClient = new APIClient<YoutubeInfo>(endpoint_youtube);
const APIKey_youtube = process.env.VITE_REACT_APP_YOUTUBE_API_KEY;

export interface YoutubeInfo {
  snippet: {
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      medium: { url: string };
      high: { url: string };
      standard: { url: string };
      maxres: { url: string };
    };
    channelTitle: string;
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: string;
  };
}

const useYoutubeInfo_detailed = (video_id: string) => {
  return useQuery({
        queryKey: ['youtubeDetailed', video_id],
        queryFn: () =>
            apiClient.getAll({
              params: {
                key: APIKey_youtube,
                id: video_id,
                part: 'contentDetails,snippet,statistics',
                fields: 'items(snippet(channelId,title,thumbnails,tags,description,channelTitle),contentDetails(duration),statistics(viewCount))'
              },
            }),
            staleTime: 24 * 60 * 60 * 1000, //24h
  })
};

export default useYoutubeInfo_detailed;