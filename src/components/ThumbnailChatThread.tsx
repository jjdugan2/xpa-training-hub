interface Props {
  index: number;
  thread: {
    direction: string;
    message: string;
    sender: string;
  };
}

const ThumbnailChatThread = ({ index, thread }: Props) => {
  const isValidThread =
    index >= 2 && thread.message && thread.message.length > 0;

  if (isValidThread) {
    return <>thread.message</>;
  }
  return null;
};

export default ThumbnailChatThread;
