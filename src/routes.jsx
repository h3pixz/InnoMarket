import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [{ index: true, Component: HomePage }],
  },
]);
