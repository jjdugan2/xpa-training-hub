import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ContentDataContainer_grid = ({ children }: Props) => {
  return (
    <Box
      _hover={{
        transform: "scale(1.02)",
        transition: "transform .15s ease-in",
      }}
      borderRadius={10}
      width={"100%"}
      overflow="hidden"
    >
      {children}
    </Box>
  );
};

export default ContentDataContainer_grid;
