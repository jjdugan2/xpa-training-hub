import { useQuery } from "@tanstack/react-query";
import APIClient, { endpoint_youtube } from "../services/api-client";

const apiClient = new APIClient<YoutubeInfo>(endpoint_youtube);
const APIKey_youtube = process.env.VITE_REACT_APP_YOUTUBE_API_KEY;

if (!APIKey_youtube) {
  console.error("YouTube API key not found in environment variables.");
} else {
  console.log("YouTube API key found:", APIKey_youtube);
}


export interface YoutubeInfo {
    snippet: {
      title: string;
      thumbnails: {
        maxres: { url: string };
        standard: { url: string };
        high: { url: string };
        medium: { url: string };          
      };
    };
    contentDetails: {
      duration: string;
    };
}

const useYoutubeInfo_minimal = (video_id: string) => {
  return useQuery({
        queryKey: ['youtubeMinimal', video_id],
        queryFn: () =>
            apiClient.getAll({
              params: {
                key: APIKey_youtube,
                id: video_id,
                part: 'contentDetails,snippet',
                fields: 'items(snippet(title,thumbnails,tags),contentDetails(duration))'
              },
            }),
            staleTime: 24 * 60 * 60 * 1000, //24h
  })
};

export default useYoutubeInfo_minimal;