import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import LikesPage from "./pages/LikesPage";
import ProductPage from "./pages/ProductPage";
import ReservedPage from "./pages/ReservedPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "product/:id", Component: ProductPage },
      { path: "reserved", Component: ReservedPage },
      { path: "likes", Component: LikesPage },
    ],
  },
]);
