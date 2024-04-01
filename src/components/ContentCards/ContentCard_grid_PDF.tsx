import {
  Box,
  Card,
  CardBody,
  Container,
  HStack,
  Heading,
  Image
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import pdf_placeholder from "../../assets/pdf_placeholder.png";
import { ContentKeys } from "../../entities/ContentKeys";
import Like from "../Like/Like";

interface Props {
  content: ContentKeys;
}

const ContentCard_grid_PDFExists = ({ content }: Props) => {
  return (
    <Card>
      <CardBody>
        <Container maxW="2x1" centerContent>
          <Box>
            <Image
              boxSize="150px"
              objectFit="cover"
              src={pdf_placeholder}
              alt={content.title}
            />
          </Box>
        </Container>
        <HStack justifyContent={"space-between"} marginBottom={3}>
          <HStack>
            <Like onClick={() => console.log("clicked LIKE")} />
            <Box>
              <Link to={content.url} target="_blank">
                Download Now
              </Link>
            </Box>
          </HStack>
        </HStack>
        <Heading fontSize="2xl">
          <Link to={content.url} target="_blank">
            {content.title}
          </Link>
        </Heading>
      </CardBody>
    </Card>
  );
};

export default ContentCard_grid_PDFExists;
