import {
  Button,
  HStack,
  Heading,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import useTopics from "../hooks/useTopics";
import { defaultSearchText, defaultTopicId } from "../initialSettings";
import useContentQueryStore from "../storeContentQuery";
import useTopicListFlybarToggleStore from "../storeTopicListFlybarToggle";

export const TopicList = () => {
  const { data, isLoading, error } = useTopics();

  const selectedTopic = useContentQueryStore((s) => s.contentQuery.topic);
  const setSelectedTopic = useContentQueryStore((s) => s.setTopic);

  const setFlybarToggle = useTopicListFlybarToggleStore(
    (s) => s.setTopicListFlybarToggle
  );

  if (isLoading) return <Spinner />;

  if (error) return null;

  return (
    <>
      <List>
        {data?.results?.map((topic, index) => (
          <ListItem key={index} paddingY={"5px"}>
            <HStack>
              <Button
                size="xs"
                whiteSpace={"normal"}
                textAlign={"left"}
                fontWeight={
                  selectedTopic?.id === undefined
                    ? topic.id === defaultTopicId
                      ? "bold"
                      : "normal"
                    : topic.id === selectedTopic.id
                    ? "bold"
                    : "normal"
                }
                onClick={() => {
                  setSelectedTopic(
                    {
                      id: topic.id,
                      name: topic.name,
                    },
                    defaultSearchText
                  );
                  setFlybarToggle(false)
                  window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page
                }}
                fontSize={"lg"}
                variant={"link"}
              >
                {topic.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default TopicList;
