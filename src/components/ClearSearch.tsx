import { Box, Button, Flex, HStack, Spacer, Stack } from "@chakra-ui/react";
import { TiDelete } from "react-icons/ti";
import useContentQueryStore from "../storeContentQuery";
import ResourceChat from "./ResourceChat";
import { emptyContent } from "../entities/ContentKeysEmpty";
import { useEffect, useMemo, useState } from "react";

const ClearSearch = () => {
  const selectedSearchText = useContentQueryStore(
    (s) => s.contentQuery.searchText
  );
  const setSelectedSearchText = useContentQueryStore((s) => s.setSearchText);

  // State to manage the key for ResourceChat
  const [chatKey, setChatKey] = useState(0);

  // Effect to change the chatKey whenever searchText changes
  useEffect(() => {
    // Increment chatKey to force reinitialization of ResourceChat
    setChatKey((prevKey) => prevKey + 1);
  }, [selectedSearchText]);

  if (selectedSearchText && selectedSearchText !== "") {
    return (
      <>
        <Stack spacing={10} paddingBottom={5}>
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
          <Box maxW={900} paddingRight={2}>
            <ResourceChat content={emptyContent} key={chatKey} />
          </Box>
        </Stack>
      </>
    );
  } else {
    return null;
  }
};

export default ClearSearch;
