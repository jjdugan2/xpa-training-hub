import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import useContent_infiniteQuery from "../hooks/useContent_infiniteQuery";
import useContentDisplayModeStore from "../storeContentDisplayMode";
import useContentQueryStore from "../storeContentQuery";
import ContentCardEmpty from "./ContentCards/ContentCardEmpty";
import ContentDataContainer_grid from "./ContentDataContainer_grid";
import ContentDataContainer_list from "./ContentDataContainer_list";
import ContentDataContainer_skeleton from "./ContentDataContainer_skeleton";
import ContentDataSkeleton from "./ContentDataSkeleton";
import ContentData_for_Index from "./ContentData_for_Index";

const ContentQuery_infiniteQuery = () => {
  const selectedContentDisplayMode = useContentDisplayModeStore(
    (s) => s.contentDisplayMode
  );
  const selectedQueryFetchCount = useContentQueryStore(
    (s) => s.contentQuery.queryFetchCount
  );

  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useContent_infiniteQuery();

  if (error) return <Text>{error.message}</Text>;

  const skeletons_count = 1;
  const skeletons = Array.from(
    { length: skeletons_count },
    (_, index) => index + 1
  );

  const totalCount = useMemo(() => {
    if (!data) return 0;
    return data.pages.reduce(
      (total, page) => total + (page.results?.length || 0),
      0
    );
  }, [data]);

  const renderContentData = () => {
    if (isLoading) {
      return skeletons.map((skeleton) => (
        <ContentDataContainer_skeleton key={skeleton}>
          <ContentDataSkeleton />
        </ContentDataContainer_skeleton>
      ));
    }

    //current:this gets returned in some sort of box with padding... but the 2 other query files don't.

    if (!data?.pages[0].results || data.pages[0].results.length === 0) {
      return (
        //CURRENT: Create a container for the empty card, just like <ContentDataContainer_skeleton> above
        <Box maxW={400}>
          <ContentCardEmpty />
        </Box>
      );
    }

    const ContentDataContainer =
      selectedContentDisplayMode.name === "list"
        ? ContentDataContainer_list
        : ContentDataContainer_grid;

    return data?.pages.map((page, index) => (
      <React.Fragment key={index}>
        {page.results?.map((content) => (
          <ContentDataContainer key={content.id}>
            <ContentData_for_Index content={content} />
          </ContentDataContainer>
        ))}
      </React.Fragment>
    ));
  };

  return (
    <>
      {selectedContentDisplayMode.name === "grid" ? (
        <Box padding="10px">
          <SimpleGrid
            columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
            spacing={6}
            padding="10px"
          >
            {renderContentData()}
          </SimpleGrid>
        </Box>
      ) : (
        <Box padding="10px" maxW={900}>
          <SimpleGrid
            columns={{ sm: 1, md: 1, lg: 1, xl: 1 }}
            spacing={6}
            padding="10px"
          >
            {renderContentData()}
          </SimpleGrid>
        </Box>
      )}
      <Box padding="0 20px">
        {totalCount >= selectedQueryFetchCount && hasNextPage && (
          <Button onClick={() => fetchNextPage()} marginY={5}>
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        )}
      </Box>
    </>
  );
};

export default ContentQuery_infiniteQuery;
