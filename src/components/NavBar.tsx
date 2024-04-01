import { HStack, Image, Spacer, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logoDark from "../assets/xprepper-black.png";
import logoLight from "../assets/xprepper-grey.png";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
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
    <HStack padding={"10px"} marginLeft={"10px"} spacing="25px">
      <Link to={"/"}>
        <Image src={logoSrc} width={"300px"} />
      </Link>
      <Spacer />
      <ColorModeSwitch toggleLogo={toggleLogo} />
    </HStack>
  );
};

export default NavBar;
