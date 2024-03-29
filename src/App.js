import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { fetchCurrentUser } from "./api/UsersAPI";
import useAuth, { AuthProvider } from "./context/auth";
import { LoadingProvider } from "./context/loading";
import LayoutPage from "./ui/components/LayoutPage/LayoutPage";
import Navbar from "./ui/components/Navbar/NavBar";
import Sidebar from "./ui/components/Sidebar/Sidebar";
import AddCategory from "./ui/pages/AddCategory";
import AddProduct from "./ui/pages/AddProduct";
import Categories from "./ui/pages/Categories";
import EditCategory from "./ui/pages/EditCategory";
import EditProduct from "./ui/pages/EditProduct";
import Home from "./ui/pages/Home";
import Login from "./ui/pages/Login";
import Products from "./ui/pages/Products";
import Register from "./ui/pages/Register";
import UserInfo from "./ui/pages/UserInfo";
import Users from "./ui/pages/Users";
import { getLocalStorageValue } from "./utils";

function App() {
  const {
    state: { user, isAuthenticated },
    dispatch,
  } = useAuth();

  useEffect(() => {
    let ignore = false;

    async function fetchUser() {
      try {
        const payload = await fetchCurrentUser(
          getLocalStorageValue("user")?.id
        );
        const { token, ...user } = payload.data;
        if (!ignore) {
          dispatch({ type: "LOAD_USER", user });
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (!user && isAuthenticated) {
      fetchUser();
    }
    return () => {
      ignore = true;
    };
  }, [dispatch, isAuthenticated, user]);

  const ProtectedRoute = ({ redirectPath = "/login", children }) => {
    if (!getLocalStorageValue("token")) {
      return <Navigate to={redirectPath} replace />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Navbar user={user} isAuthenticated={isAuthenticated} />
      <div className="flex min-h-screen">
        <Sidebar user={user} isAuthenticated={isAuthenticated} />
        <div className="content w-full p-4 lg:p-12">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <LayoutPage title="Home">
                    <Home user={user} />
                  </LayoutPage>
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <LayoutPage title="Products">
                    <Products />
                  </LayoutPage>
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <ProtectedRoute>
                  <LayoutPage title="Categories">
                    <Categories />
                  </LayoutPage>
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories/add"
              element={
                <ProtectedRoute>
                  <LayoutPage title="Add category">
                    <AddCategory />
                  </LayoutPage>
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories/edit/:name"
              element={
                <ProtectedRoute>
                  <LayoutPage title="Edit category">
                    <EditCategory />
                  </LayoutPage>
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/edit/:id"
              element={
                <ProtectedRoute>
                  <LayoutPage title="Edit product">
                    <EditProduct />
                  </LayoutPage>
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/add"
              element={
                <ProtectedRoute>
                  <LayoutPage title="Add product">
                    <AddProduct />
                  </LayoutPage>
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute>
                  <LayoutPage title="Register">
                    <Register user={user} />
                  </LayoutPage>
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <LayoutPage title="Users">
                    <Users />
                  </LayoutPage>
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/:userId"
              element={
                <ProtectedRoute>
                  <LayoutPage title="User info">
                    <UserInfo />
                  </LayoutPage>
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <LoadingProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </LoadingProvider>
);
