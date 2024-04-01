import { Box, Card, CardBody, HStack, Spacer, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface Props {
  index: number;
  thread: {
    direction: string;
    message: string;
    sender: string;
  };
  isFinalMessage: boolean;
}

const ResourceChatThread = ({ index, thread, isFinalMessage }: Props) => {
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0); // Track the current character index

  const isValidThread =
    index >= 2 && thread.message && thread.message.length > 0;

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;

    if (isValidThread && thread.direction === "incoming" && isFinalMessage) {
      timeoutId = setTimeout(() => {
        if (currentCharIndex < thread.message.length) {
          setDisplayedMessage((prevMessage) => {
            const nextChar = thread.message.charAt(currentCharIndex);
            if (nextChar === "\n") {
              return prevMessage + "<br />"; // Insert a <br> element for new line
            } else {
              return prevMessage + nextChar;
            }
          });
          setCurrentCharIndex((prevIndex) => prevIndex + 1);
        }
      }, 20); // Adjust the delay as needed
    } else {
      setDisplayedMessage(thread.message.replace(/\n/g, "<br />"));
    }

    return () => clearTimeout(timeoutId); // Clear timeout on component unmount or re-render
  }, [thread.message, index, isFinalMessage, currentCharIndex]);

  if (isValidThread) {
    const incoming = thread.direction === "incoming";
    return (
      <HStack spacing={20}>
        {!incoming && <Spacer />}
        <Card boxShadow="none" variant="filled">
          <CardBody py="3" px="5">
            <Text dangerouslySetInnerHTML={{ __html: displayedMessage }} />
          </CardBody>
        </Card>
        {incoming && <Spacer />}
      </HStack>
    );
  }
  return null;
};

export default ResourceChatThread;
