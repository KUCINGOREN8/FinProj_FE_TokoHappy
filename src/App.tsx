import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import CTA from "./pages/CTA";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import SuccessCheckout from "./pages/SuccessCheckout";
import CreateAdmin from "./pages/CreateAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/about",
    element: (
      <div>
        <Navbar />
        <CTA />
      </div>
    ),
  },
  {
    path: "/product",
    element: <Products />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/checkout/success",
    element: <SuccessCheckout />,
  },
  {
    path: "/admin",
    element: <CreateAdmin />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
