import { Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ContentData_for_Resource from "../components/ContentData_for_Resource";
import ContentHeading_ResourcePage from "../components/ContentHeading_ResourcePage";
import NavBar_WithSearch from "../components/NavBar_WithSearch";
import useContent_slugQuery from "../hooks/useContent_slugQuery";

const ResourcePage = () => {
  const { slug } = useParams();

  const { data: content, error, isLoading } = useContent_slugQuery(slug!); //The '!' tells typescript the slug will never be null

  if (isLoading) return <Spinner />;

  if (error || !content) return <Text>{error.message}</Text>;

  return (
    <>
      <NavBar_WithSearch />
      <Grid display={""}>
        <GridItem area="main" paddingX={5} width={"100%"}>
          <ContentHeading_ResourcePage content={content} />
          <ContentData_for_Resource content={content} />
        </GridItem>
      </Grid>
    </>
  );
};

export default ResourcePage;
