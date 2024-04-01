import { Button, Icon } from "@chakra-ui/react";
import { FaList, FaTh } from "react-icons/fa";
import useContentDisplayModeStore from "../storeContentDisplayMode";

const ContentDisplayToggle = () => {
  const selectedContentDisplayMode = useContentDisplayModeStore(
    (s) => s.contentDisplayMode
  );
  const setselectedContentDisplayMode = useContentDisplayModeStore(
    (s) => s.setContentDisplayMode
  );

  const handleToggleClick = () => {
    const newMode: "grid" | "list" =
      selectedContentDisplayMode.name === "grid" ? "list" : "grid";
    setselectedContentDisplayMode(newMode);
  };

  return (
    <Button
      colorScheme="gray"
      color={"gray.500"}
      size="md"
      width={"50"}
      onClick={handleToggleClick}
    >
      {selectedContentDisplayMode.name === "grid" ? (
        <Icon as={FaList} boxSize={5} />
      ) : (
        <Icon as={FaTh} boxSize={5} />
      )}
    </Button>
  );
};

export default ContentDisplayToggle;
