import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Dispositives from "./pages/Dispositives";
import { getDispositiveInfo, getDispositives } from "./libs/auxiliars";
import Dispositive from "./pages/Dispositive";
import AddModule from "./pages/AddModule";
import Module from "./pages/Module";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/dispositives",
    element: <Dispositives />,
    loader: async (): Promise<string[]> => getDispositives(),
  },
  {
    path: "/dispositives/:dispositiveId",
    element: <Dispositive />,
    loader: async ({ params }) => getDispositiveInfo(params.dispositiveId),
  },
  {
    path: "/dispositives/:dispositiveId/:module",
    element: <Module />,
  },
  {
    path: "/addModule/:dispositiveId",
    element: <AddModule />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
);
