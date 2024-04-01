import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

interface Props {
  toggleLogo: () => void;
}

const ColorModeSwitch = ({ toggleLogo }: Props) => {
  const { toggleColorMode, colorMode } = useColorMode();

  const handleToggle = () => {
    toggleColorMode();
    toggleLogo();
  };

  return (
    <HStack>
      <Switch
        colorScheme="green"
        isChecked={colorMode === "dark"}
        onChange={handleToggle}
      />
      <Text whiteSpace={"nowrap"}>Dark Mode</Text>
    </HStack>
  );
};

export default ColorModeSwitch;
