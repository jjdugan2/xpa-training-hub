import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { ContentKeys } from "../entities/ContentKeys";
import ResourceChatThread from "./ResourceChatThread";
import {
  ArrowForwardIcon,
  ArrowRightIcon,
  ChatIcon,
  EmailIcon,
} from "@chakra-ui/icons";

interface Props {
  content: ContentKeys;
}

const ResourceChat = ({ content }: Props) => {
  const chatInputRef = useRef<HTMLInputElement>(null);
  const [chatInput, setChatInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am the XPrepper!",
      sender: "ChatGPT",
      direction: "incoming",
    },
  ]);

  const [initialMessageSent, setInitialMessageSent] = useState(false);

  useEffect(() => {
    const initialMessage = `Tell me more about ${content.title} with at least 3 actionable steps.`;
    if (!initialMessageSent) {
      handleSend(initialMessage);
      setInitialMessageSent(true);
    }
  }, [initialMessageSent]);

  const handleSend = async (message: string) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };
    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages: any[]) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
      content:
        "No more than 300 characters. Add two linebreaks between sentences. Never start with a conversational acknowledgment.",
    };

    const apiRequestBody = {
      model: "gpt-4-turbo-preview",
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const queryString = `apiRequestBody=${encodeURIComponent(
        JSON.stringify(apiRequestBody)
      )}`;

      const response = await fetch(
        "https://xprepper.com/api/training-hub/getOpenAI.php?" + queryString,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setMessages([
        ...chatMessages,
        {
          message: data.choices[0].message.content,
          sender: "ChatGPT",
          direction: "incoming",
        },
      ]);
      setTyping(false);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleTellMeMore = (message: string) => {
    handleSend(message);
    setChatInput("");
  };

  return (
    <>
      <Box borderWidth="1px" borderRadius="lg" p={5}>
        <VStack align={"left"} spacing={7}>
          {messages.map((message, i) => {
            const isFinalMessage = i === messages.length - 1;
            return (
              <ResourceChatThread
                key={i}
                index={i}
                thread={message}
                isFinalMessage={isFinalMessage}
              />
            );
          })}
          {messages.length > 0 &&
            messages[messages.length - 1].sender === "user" && (
              <>
                <Flex minWidth="max-content" alignItems="center" gap="2">
                  <Box p="2">
                    <Heading size="md">XPrepper is responding...</Heading>
                  </Box>
                  <Spacer />
                  <ButtonGroup gap="2">
                    <Spinner size="lg" opacity={0.8} />
                  </ButtonGroup>
                </Flex>
              </>
            )}
          <HStack spacing="25px">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSend(chatInput); // Pass the current input value to handleSend
                setChatInput(""); // Reset the input field after sending
              }}
            >
              <InputGroup>
                <InputLeftElement children={<ChatIcon opacity={0.7} />} />
                <Input
                  ref={chatInputRef}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  borderRadius={20}
                  placeholder="Ask a question..."
                  variant={"filled"}
                />
              </InputGroup>
            </form>
            {messages[messages.length - 1].sender === "ChatGPT" && (
              <>
                {chatInput.length >= 1 ? (
                  <Button
                    leftIcon={<ArrowRightIcon boxSize={3} />}
                    colorScheme="orange"
                    size={"md"}
                    onClick={() => handleTellMeMore(chatInput)}
                    px={10}
                  >
                    Send
                  </Button>
                ) : null}{" "}
                {chatInput.length === 0 ? (
                  <Button
                    leftIcon={<ArrowRightIcon boxSize={3} />}
                    colorScheme="orange"
                    size={"md"}
                    onClick={() => handleTellMeMore("Tell me more")}
                    px={10}
                  >
                    {messages.length === 3
                      ? "Try 'Tell me more'"
                      : messages.length >= 4
                      ? "Tell me more"
                      : ""}
                  </Button>
                ) : null}{" "}
              </>
            )}
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

export default ResourceChat;
