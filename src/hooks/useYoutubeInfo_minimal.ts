import { useQuery } from "@tanstack/react-query";
import APIClient, { endpoint_youtube } from "../services/api-client";

const apiClient = new APIClient<YoutubeInfo>(endpoint_youtube);

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
                detail_type: 'minimal',
                video_id: video_id
              },
            }),
            staleTime: 24 * 60 * 60 * 1000, //24h
  })
};

export default useYoutubeInfo_minimal;