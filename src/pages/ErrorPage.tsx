import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box } from "@chakra-ui/react";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <NavBar />
      <Box padding={5}>
        <h1>Oops...</h1>
        <p>
          {isRouteErrorResponse(error)
            ? "This page does not exist."
            : "An unexpected error has occured."}
        </p>
      </Box>
    </>
  );
};

export default ErrorPage;
