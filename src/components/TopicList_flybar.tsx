import { TopicList } from "./TopicList";
import { Flex } from "@chakra-ui/react";
import useTopicListFlybarToggleStore from "../storeTopicListFlybarToggle";

const TopicList_flybar = () => {
  const flybarToggle = useTopicListFlybarToggleStore(
    (s) => s.topicListFlybarToggle.state
  );

  return (
    <>
      {flybarToggle && ( // Check if flybarToggle is true
        <Flex paddingX={1} marginBottom={5}>
          <TopicList />
        </Flex>
      )}
      {/* Other content */}
    </>
  );
};

export default TopicList_flybar;
