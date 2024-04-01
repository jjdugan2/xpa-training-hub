import { Box, Button, Icon } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import useTopicListFlybarToggleStore from "../storeTopicListFlybarToggle";

const TopicList_flybar_toggle = () => {
  const flybarToggle = useTopicListFlybarToggleStore(
    (s) => s.topicListFlybarToggle
  );
  const setFlybarToggle = useTopicListFlybarToggleStore(
    (s) => s.setTopicListFlybarToggle
  );

  return (
    <>
      {flybarToggle.state ? (
        <Button
          colorScheme="gray"
          color={"gray.500"}
          size="md"
          onClick={() => {
            setFlybarToggle(false);
          }}
        >
          <Icon as={CloseIcon} boxSize={3.5} marginX={1} />
        </Button>
      ) : (
        <Button
          colorScheme="gray"
          color={"gray.500"}
          size="md"
          onClick={() => {
            setFlybarToggle(true);
          }}
        >
          <Icon as={HamburgerIcon} boxSize={5} marginX={1} />
        </Button>
      )}
    </>
  );
};

export default TopicList_flybar_toggle;
