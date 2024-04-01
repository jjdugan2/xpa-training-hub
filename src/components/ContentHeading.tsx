import { Heading } from "@chakra-ui/react";
import { defaultWelcomeTitle } from "../initialSettings";
import useContentQueryStore from "../storeContentQuery";

const ContentHeading = () => {
  const selectedHeading = useContentQueryStore(
    (s) => s.contentQuery.topic?.name
  );
  const selectedSearchText = useContentQueryStore(
    (s) => s.contentQuery.searchText
  );
  const heading = `${selectedHeading || defaultWelcomeTitle}`;

  if (selectedSearchText) {
    return (
      <Heading as={"h1"} marginY={5} size={"lg"}>
        Searched: {selectedSearchText}
      </Heading>
    );
  } else {
    return (
      <Heading as={"h1"} marginY={5} size={"lg"}>
        {heading}
      </Heading>
    );
  }
};

export default ContentHeading;
