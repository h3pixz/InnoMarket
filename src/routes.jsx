import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import Layout from "./components/Layout";
import AboutPage from "./pages/AboutPage";
import AccountPage from "./pages/AccountPage";
import AdminItemsPage from "./pages/AdminItemsPage";
import HomePage from "./pages/HomePage";
import LikesPage from "./pages/LikesPage";
import LoginPage from "./pages/LoginPage";
import MerchantPage from "./pages/MerchantPage";
import ProductPage from "./pages/ProductPage";
import ReservedPage from "./pages/ReservedPage";
import ShopsPage from "./pages/ShopsPage";

export const router = createBrowserRouter([
  { path: "/login", Component: LoginPage },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [{ index: true, Component: AdminItemsPage }],
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "product/:id", Component: ProductPage },
      { path: "reserved", Component: ReservedPage },
      { path: "likes", Component: LikesPage },
      { path: "shops", Component: ShopsPage },
      { path: "merchant", Component: MerchantPage },
      { path: "account", Component: AccountPage },
    ],
  },
]);
