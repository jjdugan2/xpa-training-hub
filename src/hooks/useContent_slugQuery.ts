import { useQuery } from "@tanstack/react-query";
import APIClient, { endpoint_siteContent } from "../services/api-client";
import { ContentKeys } from "../entities/ContentKeys";

const apiClient = new APIClient<ContentKeys>(endpoint_siteContent);

const useContent_slugQuery = (slug: string) =>
  useQuery<ContentKeys, Error>({
    queryKey: ['resource', slug],
    queryFn: () =>
      apiClient.get({
        params: {
          verb: 'get',
          component: 'content',
          wrap: false,
          slug: slug,
        },
      }),
    staleTime: 24 * 60 * 60 * 1000, // 24h
  });

export default useContent_slugQuery;
