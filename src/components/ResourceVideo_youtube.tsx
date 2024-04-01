import { ContentKeys } from "../entities/ContentKeys";
import { AspectRatio } from "@chakra-ui/react";

interface Props {
  content: ContentKeys;
}

const ResourceVideo_youtube = ({ content }: Props) => {
  const embedURL = "https://www.youtube.com/embed/" + content.video_id;

  return (
    <>
      <AspectRatio ratio={16 / 9}>
        <iframe title={content.title} src={embedURL} allowFullScreen />
      </AspectRatio>
    </>
  );
};

export default ResourceVideo_youtube;
