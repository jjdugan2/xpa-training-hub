import { useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import { Badge } from "@chakra-ui/react";

interface Props {
  onClick: () => void;
}

const Like = ({ onClick }: Props) => {
  const [status, setStatus] = useState(false);
  let color = status ? "pink" : "gray";

  const toggle = () => {
    setStatus(!status);
    onClick();
  };

  return (
    <Badge paddingX={2} paddingY={2} borderRadius={"4px"} onClick={toggle}>
      <BsHeartFill color={color} size={13} />
    </Badge>
  );
};

export default Like;
