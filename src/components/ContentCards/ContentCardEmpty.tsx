import { Alert, AlertIcon, Stack } from "@chakra-ui/react";

const ContentCardEmpty = () => {
  return (
    <Alert status="info">
      <AlertIcon />
      Nothing to show.
    </Alert>
  );
};

export default ContentCardEmpty;
