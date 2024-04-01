import useContentQueryStore from "../storeContentQuery";
import ContentQuery_default from "./ContentQuery_default";
import ContentQuery_infiniteQuery from "./ContentQuery_infiniteQuery";
import ContentQuery_infiniteScroll from "./ContentQuery_infiniteScroll";

import {
  defaultContentQueryFetchCount,
  defaultContentQueryFetchCount_modality1,
  defaultContentQueryFetchCount_modality2,
  defaultContentQueryFetchCount_modality3,
  defaultContentQueryType,
  defaultContentQueryType_modality1,
  defaultContentQueryType_modality2,
  defaultContentQueryType_modality3,
} from "../initialSettings";

const Content = () => {
  const selectedModality = useContentQueryStore((s) => s.contentQuery.modality);
  const setSelectedQueryType = useContentQueryStore((s) => s.setQueryType);
  const setSelectedQueryFetchCount = useContentQueryStore(
    (s) => s.setQueryFetchCount
  );

  const queryType =
    selectedModality?.id === 1
      ? defaultContentQueryType_modality1
      : selectedModality?.id === 2
      ? defaultContentQueryType_modality2
      : selectedModality?.id === 3
      ? defaultContentQueryType_modality3
      : defaultContentQueryType;

  const queryFetchCount =
    selectedModality?.id === 1
      ? defaultContentQueryFetchCount_modality1
      : selectedModality?.id === 2
      ? defaultContentQueryFetchCount_modality2
      : selectedModality?.id === 3
      ? defaultContentQueryFetchCount_modality3
      : defaultContentQueryFetchCount;

  setSelectedQueryType(queryType);
  setSelectedQueryFetchCount(queryFetchCount);

  if (queryType === "useQuery") {
    return <ContentQuery_default />;
  } else if (queryType === "useInfiniteQuery") {
    return <ContentQuery_infiniteQuery />;
    //  } else if (queryType === "useInfiniteScroll") {
    //    return <ContentQuery_infiniteScroll />;
  } else {
    return <div>nope</div>;
  }
};

export default Content;
