import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import useContent_infiniteQuery from "../hooks/useContent_infiniteQuery";
import useContentDisplayModeStore from "../storeContentDisplayMode";
import ContentCardEmpty from "./ContentCards/ContentCardEmpty";
import ContentDataContainer_grid from "./ContentDataContainer_grid";
import ContentDataContainer_list from "./ContentDataContainer_list";
import ContentDataContainer_skeleton from "./ContentDataContainer_skeleton";
import ContentDataSkeleton from "./ContentDataSkeleton";
import ContentData_for_Index from "./ContentData_for_Index";

const ContentQuery_infiniteScroll = () => {
  const selectedContentDisplayMode = useContentDisplayModeStore(
    (s) => s.contentDisplayMode
  );

  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useContent_infiniteQuery();

  if (error) return <Text>{error.message}</Text>;

  const skeletons_count = 1;
  const skeletons = Array.from(
    { length: skeletons_count },
    (_, index) => index + 1
  );

  if (isLoading) {
    return skeletons.map((skeleton) => (
      <ContentDataContainer_skeleton key={skeleton}>
        <ContentDataSkeleton />
      </ContentDataContainer_skeleton>
    ));
  }

  if (!data?.pages[0].results || data.pages[0].results.length === 0) {
    return (
      //CURRENT: Create a container for the empty card, just like <ContentDataContainer_skeleton> above
      <Box maxW={400}>
        <ContentCardEmpty />
      </Box>
    );
  }

  let contentDataElements: JSX.Element[] = [];

  const renderContentData = () => {
    const ContentDataContainer =
      selectedContentDisplayMode.name === "list"
        ? ContentDataContainer_list
        : ContentDataContainer_grid;

    contentDataElements =
      data?.pages.flatMap((page, index) => (
        <React.Fragment key={index}>
          {page.results?.map((content) => (
            <ContentDataContainer key={content.id}>
              <ContentData_for_Index content={content} />
            </ContentDataContainer>
          ))}
        </React.Fragment>
      )) ?? [];
  };

  renderContentData();

  return (
    <>
      {selectedContentDisplayMode.name === "grid" ? (
        <Box padding="10px">
          <InfiniteScroll
            dataLength={contentDataElements.length}
            hasMore={!!hasNextPage}
            next={() => fetchNextPage()}
            loader={<Spinner />}
          >
            <SimpleGrid
              columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
              spacing={6}
              padding="10px"
            >
              {contentDataElements.map((element, index) => (
                <React.Fragment key={index}>{element}</React.Fragment>
              ))}
            </SimpleGrid>
          </InfiniteScroll>
        </Box>
      ) : (
        <Box padding="10px" maxW={900}>
          <InfiniteScroll
            dataLength={contentDataElements.length}
            hasMore={!!hasNextPage}
            next={() => fetchNextPage()}
            loader={<Spinner />}
          >
            <SimpleGrid
              columns={{ sm: 1, md: 1, lg: 1, xl: 1 }}
              spacing={6}
              padding="10px"
            >
              {contentDataElements.map((element, index) => (
                <React.Fragment key={index}>{element}</React.Fragment>
              ))}
            </SimpleGrid>
          </InfiniteScroll>
        </Box>
      )}
    </>
  );
};

export default ContentQuery_infiniteScroll;
