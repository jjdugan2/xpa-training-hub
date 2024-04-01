import {
  Card,
  CardBody,
  HStack,
  Heading,
  Text,
  Image,
  Box,
  Icon,
  Flex,
  Spacer,
  AspectRatio,
  SimpleGrid,
  GridItem,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { ContentKeys } from "../entities/ContentKeys";
import { YoutubeInfo_detailed } from "../entities/YoutubeInfo_detailed";
import ExpandableText from "./ExpandableText";
import ResourceAttributes_youtube from "./ResourceAttributes_youtube";
import ResourceVideo_youtube from "./ResourceVideo_youtube";
import ResourceChat from "./ResourceChat";
import { Stack } from "react-bootstrap";

interface Props {
  content: ContentKeys;
  youtubeInfo_detailed: YoutubeInfo_detailed;
}

const ResourceDetails = ({
  content,
  youtubeInfo_detailed: youtubeInfo,
}: Props) => {
  return (
    <>
      <Box marginY={5}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={20}>
          <GridItem>
            <ResourceChat content={content} />
          </GridItem>
          <GridItem>
            <Box paddingBottom={5}>
              <ResourceVideo_youtube content={content}></ResourceVideo_youtube>
            </Box>
            <ExpandableText>{youtubeInfo.description}</ExpandableText>
            <ResourceAttributes_youtube
              content={content}
              youtubeInfo={youtubeInfo}
            ></ResourceAttributes_youtube>
          </GridItem>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default ResourceDetails;
