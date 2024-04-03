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
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  let boldTextArray: string[] = [];

  const isValidThread =
    index >= 2 && thread.message && thread.message.length > 0;

  //--NOTE: this is in development.
  useEffect(() => {
    if (isValidThread && thread.direction === "incoming") {
      const regex = /\*\*(.*?)\*\*/g;
      let match;
      while ((match = regex.exec(thread.message)) !== null) {
        boldTextArray.push(match[1]);
      }

      let updatedMessage = thread.message;

      if (boldTextArray.length > 0) {
        //console.log("Array: ", boldTextArray);

        boldTextArray.forEach((boldText, index) => {
          const boldTextIndex = updatedMessage.indexOf(boldText);
          if (boldTextIndex !== -1) {
            //console.log("Found: ", boldText);
            const boldTextLength = boldText.length;
            const boldTextWithTags = `<b>${boldText}</b>`;
            // Insert bold tags into the message string at the appropriate positions
            updatedMessage =
              updatedMessage.slice(0, boldTextIndex) +
              boldTextWithTags +
              updatedMessage.slice(boldTextIndex + boldTextLength);
            // Remove the element from the boldTextArray
            boldTextArray = boldTextArray.filter((text, idx) => idx !== index);
          }
        });
      }

      //console.log(updatedMessage);
    }
  }, [thread.message, isValidThread]);

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;

    if (isValidThread && thread.direction === "incoming" && isFinalMessage) {
      timeoutId = setTimeout(() => {
        if (currentCharIndex < thread.message.length) {
          setDisplayedMessage((prevMessage) => {
            let messageToDisplay = prevMessage;
            const nextChar = thread.message.charAt(currentCharIndex);
            if (nextChar === "\n") {
              return messageToDisplay + "<br />";
            } else {
              return messageToDisplay + nextChar;
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
