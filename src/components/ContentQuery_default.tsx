import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import useContent_defaultQuery from "../hooks/useContent_defaultQuery";
import useContentDisplayModeStore from "../storeContentDisplayMode";
import ContentCardEmpty from "./ContentCards/ContentCardEmpty";
import ContentDataContainer_grid from "./ContentDataContainer_grid";
import ContentDataContainer_list from "./ContentDataContainer_list";
import ContentDataContainer_skeleton from "./ContentDataContainer_skeleton";
import ContentDataSkeleton from "./ContentDataSkeleton";
import ContentData_for_Index from "./ContentData_for_Index";

const ContentQuery_default = () => {
  const selectedContentDisplayMode = useContentDisplayModeStore(
    (s) => s.contentDisplayMode
  );

  const { data, error, isLoading } = useContent_defaultQuery();

  if (error) return <Text>{error.message}</Text>;

  const skeletons_count = 1;
  const skeletons = Array.from(
    { length: skeletons_count },
    (_, index) => index + 1
  );

  const renderContentData = () => {
    if (isLoading) {
      return skeletons.map((skeleton) => (
        <ContentDataContainer_skeleton key={skeleton}>
          <ContentDataSkeleton />
        </ContentDataContainer_skeleton>
      ));
    }

    if (!data?.results || data.results.length === 0) {
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

    return (data?.results).map((content) => (
      <ContentDataContainer key={content.id}>
        <ContentData_for_Index content={content} />
      </ContentDataContainer>
    ));
  };

  return (
    <>
      {selectedContentDisplayMode.name === "grid" ? (
        <Box padding="10px">
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
            {renderContentData()}
          </SimpleGrid>
        </Box>
      ) : (
        <Box padding="10px" maxW={900}>
          <SimpleGrid columns={{ sm: 1, md: 1, lg: 1, xl: 1 }} spacing={6}>
            {renderContentData()}
          </SimpleGrid>
        </Box>
      )}
    </>
  );
};

export default ContentQuery_default;
