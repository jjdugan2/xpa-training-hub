import { Box, Button, Flex, HStack, Spacer } from "@chakra-ui/react";
import { TiDelete } from "react-icons/ti";
import useContentQueryStore from "../storeContentQuery";

const ClearSearch = () => {
  const selectedSearchText = useContentQueryStore(
    (s) => s.contentQuery.searchText
  );
  const setSelectedSearchText = useContentQueryStore((s) => s.setSearchText);

  if (selectedSearchText && selectedSearchText !== "") {
    return (
      <>
        <Flex marginBottom={5}>
          <HStack spacing={2} direction="row" align="center">
            <Box>
              <Button
                key="1"
                colorScheme="gray"
                size="md"
                paddingLeft={2}
                fontWeight="normal"
                variant="outline"
                onClick={() => setSelectedSearchText("")}
              >
                <TiDelete size={26} />
                <Spacer w={1} /> Clear Search
              </Button>
            </Box>
          </HStack>
        </Flex>
      </>
    );
  } else {
    return null;
  }
};

export default ClearSearch;
