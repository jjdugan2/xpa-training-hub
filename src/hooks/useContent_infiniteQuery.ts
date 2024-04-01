import { useInfiniteQuery } from "@tanstack/react-query";
import { ContentKeys } from "../entities/ContentKeys";
import APIClient, { endpoint_siteContent, FetchResponse } from "../services/api-client";
import useContentQueryStore from "../storeContentQuery";

const apiClient = new APIClient<ContentKeys>(endpoint_siteContent);

const useContent_infiniteQuery = () => {
  const contentQuery = useContentQueryStore(s => s.contentQuery)
  return useInfiniteQuery<FetchResponse<ContentKeys>, Error>({
    queryKey: ['content', contentQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          verb: 'get',
          component: 'content',
          topics_main_id: contentQuery.topic?.id,
          modality_id: contentQuery.modality?.id,
          search: contentQuery.searchText,
          _page: pageParam,
          _limit: contentQuery.queryFetchCount,
          infiniteQuery: true
        },
      }),
    staleTime: 24 * 60 * 60 * 1000, // 24h
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    }
  });
}

export default useContent_infiniteQuery;
