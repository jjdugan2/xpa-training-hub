import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ContentDataContainer_skeleton = ({ children }: Props) => {
  return (
    <Box borderRadius={10} maxW={400} overflow="hidden">
      {children}
    </Box>
  );
};

export default ContentDataContainer_skeleton;
