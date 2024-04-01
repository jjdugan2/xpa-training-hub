import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Index from "./Index";
import Layout from "./Layout";
import ResourcePage from "./ResourcePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "/resources/:slug",
        element: <ResourcePage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
