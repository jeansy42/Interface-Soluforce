import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Dispositives from "./pages/Dispositives";
import {
  getDispositiveInfo,
  getDispositives,
  getModuleFromDispositiveById,
  getModuleInfo,
} from "./libs/auxiliars";
import Dispositive from "./pages/Dispositive";
import AddModule from "./pages/AddModule";
import Module from "./pages/Module";
import UpdateModule from "./pages/UpdateModule";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <ErrorPage /> },
  {
    path: "/dispositives",
    element: <Dispositives />,
    errorElement: <ErrorPage />,
    loader: async (): Promise<string[]> => getDispositives(),
  },
  {
    path: "/dispositives/:dispositiveId",
    element: <Dispositive />,
    errorElement: <ErrorPage />,
    loader: async ({ params }) => getDispositiveInfo(params.dispositiveId),
  },
  {
    path: "/dispositives/:dispositiveId/:module",
    element: <Module />,
    errorElement: <ErrorPage />,
    loader: async ({ params: { dispositiveId, module } }) =>
      getModuleInfo(dispositiveId as string, module as string),
  },
  {
    path: "/addModule/:dispositiveId",
    element: <AddModule />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/updateModule/:dispositiveId/:moduleId",
    element: <UpdateModule />,
    errorElement: <ErrorPage />,
    loader: async ({ params: { dispositiveId, moduleId } }) =>
      getModuleFromDispositiveById(dispositiveId as string, moduleId as string),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
);
