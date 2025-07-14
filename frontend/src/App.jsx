import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserProfile } from "./slices/authSlice";
import Header from "./components/Header";
import ProductDetail from "./pages/ProductDetail";
import MyProfile from "./pages/MyProfile";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Header />
                <Home />
              </PrivateRoute>
            }
          />
           <Route
            path="/products/:id"
            element={
              <PrivateRoute>
                <Header />
                <ProductDetail />
              </PrivateRoute>
            }
          />
          <Route path="/profile" element={
            <PrivateRoute>
              <Header />
              <MyProfile />
            </PrivateRoute>
          } />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
