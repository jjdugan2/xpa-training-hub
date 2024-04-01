import { ViewIcon } from "@chakra-ui/icons";
import { Button, HStack, Icon, Text } from "@chakra-ui/react";
import { ContentKeys } from "../entities/ContentKeys";
import { defaultSearchText } from "../initialSettings";
import useContentQueryStore from "../storeContentQuery";
import useTopicListFlybarToggleStore from "../storeTopicListFlybarToggle";
import { useEffect, useState } from "react";

interface Props {
  content: ContentKeys;
}

const ContentCard_seeRelated = ({ content }: Props) => {
  const selectedSearchText = useContentQueryStore(
    (s) => s.contentQuery.searchText
  );
  const setSelectedTopic = useContentQueryStore((s) => s.setTopic);
  const [isVisible, setIsVisible] = useState(false); // State to manage visibility

  const setFlybarToggle = useTopicListFlybarToggleStore(
    (s) => s.setTopicListFlybarToggle
  );

  useEffect(() => {
    setIsVisible(Boolean(selectedSearchText)); // Update visibility based on selectedSearchText
  }, [selectedSearchText]);

  return (
    <>
      {isVisible && ( // Conditional rendering wrapped in a fragment
        <Button
          key="1"
          colorScheme="gray"
          size="xs"
          paddingLeft={2}
          fontWeight="normal"
          variant="none"
          onClick={() => {
            setSelectedTopic(
              {
                id: content.topics_main_id,
                name: content.topics_main_name,
              },
              defaultSearchText
            );
            setFlybarToggle(false);
            window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page
          }}
        >
          <HStack py="0" spacing="5px" color={"gray.500"}>
            <Icon as={ViewIcon} boxSize={4} color={"gray.400"} />
            <Text fontSize={"12px"}>Category: {content.topics_main_name}</Text>
          </HStack>
        </Button>
      )}
    </>
  );
};

export default ContentCard_seeRelated;
