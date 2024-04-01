import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Hide,
  Icon,
  Show,
} from "@chakra-ui/react";
import ClearSearch from "../components/ClearSearch";
import Content from "../components/Content";
import ContentDisplayToggle from "../components/ContentDisplayToggle";
import ContentHeading from "../components/ContentHeading";
import ModalityList from "../components/ModalityList";
import NavBar_WithSearch from "../components/NavBar_WithSearch";
import TopicList from "../components/TopicList";
import TopicList_flybar from "../components/TopicList_flybar";
import TopicList_flybar_toggle from "../components/TopicList_flybar_toggle";

function HomePage() {
  return (
    <>
      <NavBar_WithSearch />
      <Grid
        templateAreas={{
          base: `"main"`,
          lg: `"aside main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "250px 1fr",
        }}
      >
        <Show above="lg">
          <GridItem area="aside" paddingX={5} marginY={5}>
            <TopicList />
          </GridItem>
        </Show>
        <GridItem area="main" paddingX={1}>
          <Box paddingLeft={2}>
            <Flex>
              <HStack>
                <Show below="lg">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width="50px"
                    marginRight={2}
                  >
                    <TopicList_flybar_toggle />
                  </Box>
                </Show>
                <Box>
                  <ContentHeading />
                </Box>
              </HStack>
            </Flex>
            <Show below="lg">
              <TopicList_flybar />
            </Show>
            <Flex marginBottom={5}>
              <HStack>
                <Box>
                  <ModalityList />
                </Box>
                <Box marginLeft={2}>
                  <ContentDisplayToggle />
                </Box>
              </HStack>
            </Flex>
            <ClearSearch />
          </Box>
          <Content />
        </GridItem>
      </Grid>
    </>
  );
}

export default HomePage;
