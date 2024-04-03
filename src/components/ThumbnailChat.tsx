import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useEffect, useState } from "react";
import { ContentKeys } from "../entities/ContentKeys";
import ThumbnailChatThread from "./ThumbnailChatThread";

interface Props {
  content: ContentKeys;
}

const ThumbnailChat = ({ content }: Props) => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am the XPrepper!",
      sender: "ChatGPT",
      direction: "incoming",
    },
  ]);

  const [initialMessageSent, setInitialMessageSent] = useState(false);

  useEffect(() => {
    const initialMessage = `I'm an avid prepper interested in ${content.topics_main_name}. Introduce "${content.title}" in at most 10 words.`;

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
      content: "No more than 10 words. Never start with an acknowledgment.",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      //model: "gpt-4-turbo-preview",
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
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return messages.map((message, i) => (
    <ThumbnailChatThread key={i} index={i} thread={message} />
  ));
};

export default ThumbnailChat;
