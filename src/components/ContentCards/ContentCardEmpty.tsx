import { Alert, AlertIcon, Stack } from "@chakra-ui/react";

const ContentCardEmpty = () => {
  return (
    <Alert status="info">
      <AlertIcon />
      Nothing more to show.
    </Alert>
  );
};

export default ContentCardEmpty;
