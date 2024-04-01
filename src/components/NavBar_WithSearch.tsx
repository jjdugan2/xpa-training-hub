import { Box, HStack, Image, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logoDark from "../assets/xprepper-black.png";
import logoLight from "../assets/xprepper-grey.png";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

const NavBar_WithSearch = () => {
  const { colorMode } = useColorMode();
  const storedColorMode =
    localStorage.getItem("chakra-ui-color-mode") || colorMode;
  const [logoSrc, setLogoSrc] = useState(
    storedColorMode === "dark" ? logoLight : logoDark
  );

  const toggleLogo = () => {
    const newLogo = storedColorMode === "dark" ? logoDark : logoLight;
    setLogoSrc(newLogo);
  };

  return (
    <HStack padding={"10px"} spacing="25px">
      <Link to={"/"}>
        <Image src={logoSrc} width={"300px"} />
      </Link>
      <SearchInput />
      <ColorModeSwitch toggleLogo={toggleLogo} />
    </HStack>
  );
};

export default NavBar_WithSearch;
