import { useQuery } from "@tanstack/react-query";
import { ContentKeys } from "../entities/ContentKeys";
import APIClient, { endpoint_siteContent, FetchResponse } from "../services/api-client";
import useContentQueryStore from "../storeContentQuery";

const apiClient = new APIClient<ContentKeys>(endpoint_siteContent);

const useContent_defaultQuery = () => {
  const contentQuery = useContentQueryStore(s => s.contentQuery)
  return useQuery<FetchResponse<ContentKeys>, Error>({
    queryKey: ['content', contentQuery],
    queryFn: () =>
      apiClient.getAll({
        params: {
          verb: 'get',
          component: 'content',
          topics_main_id: contentQuery.topic?.id,
          modality_id: contentQuery.modality?.id,
          search: contentQuery.searchText,
        },
      }),
    staleTime: 24 * 60 * 60 * 1000, // 24h
  });
}

export default useContent_defaultQuery;
