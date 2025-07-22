import "./App.css";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import SocketJoiner from "./socket/socket-joiner";
import { useDispatch } from "react-redux";
import { Suspense, lazy, useEffect } from "react";
import { getUserProfile } from "./slices/authSlice";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { profileLoaded, user } = useSelector((state) => state.auth);

  const Login = lazy(() => import("./pages/Login"));
  const SignUp = lazy(() => import("./pages/SignUp"));
  const Home = lazy(() => import("./pages/Home"));
  const ProductDetail = lazy(() => import("./pages/ProductDetail"));
  const MyProfile = lazy(() => import("./pages/MyProfile"));
  const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
  const PageNotFound = lazy(() => import("./pages/PageNotFound"));
  const Header = lazy(() => import("./components/Header"));
  const SearchPage = lazy(() => import("./pages/SearchPage"));

  useEffect(() => {
    if (!profileLoaded && !user) {
      dispatch(getUserProfile());
    }
  }, [dispatch, profileLoaded, user]);
  return (
    <div className="min-h-screen bg-gray-100">
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <SocketJoiner />
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/products/:id"
              element={
                <PrivateRoute>
                  <SocketJoiner />
                  <ProductDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <SocketJoiner />
                  <MyProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <SocketJoiner />
                  <CheckoutPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/search"
              element={
                <PrivateRoute>
                  <SocketJoiner />
                  <SearchPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
    </div>
  );
}

export default App;
