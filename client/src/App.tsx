import { RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import { Blogs } from "./pages/admin/blogs.tsx";
import { Register } from "./pages/auth/register.tsx";
import { Login } from "./pages/auth/login.tsx";
import { AdminLayout, AuthLayout } from "./components/layouts.tsx";
import { Home } from "./pages/home.tsx";
import { Admin } from "./pages/admin/admin.tsx";
import { Write } from "./pages/admin/write.tsx";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext.tsx";
import { AuthContextValue } from "./util/types.ts";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      Page Not Found | <button className="text-blue-500 ml-1" onClick={() => navigate(-1)}> go back </button>
    </div>
  )
}

function App() {
  const { isAuthenticated } = useContext(AuthContext) as AuthContextValue;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    // Auth
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "sign-up",
          element: <Register />,
        },
        {
          path: "sign-in",
          element: <Login />,
        },
      ],
    },
    // Admin
    {
      path: "/",
      element: isAuthenticated ? <AdminLayout /> : <Navigate to="/sign-in" />,
      children: [
        {
          path: "blogs",
          element: <Blogs />,
        },
        {
          path: "home",
          element: <Admin />,
        },
        {
          path: "write",
          element: <Write />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <div className="dark:bg-black dark:opacity-90">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
