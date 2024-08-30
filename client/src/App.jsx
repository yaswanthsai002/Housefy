import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "@components/Header";
import Loader from "@components/Loader";
import ProtectedRoutes from "./utils/ProtectedRoutes";

const Signin = lazy(() => import("@pages/Signin"));
const Home = lazy(() => import("@pages/Home"));
const Signup = lazy(() => import("@pages/Signup"));

const App = () => {  
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route
            exact
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <Home />
              </Suspense>
            }
          />
        </Route>
        <Route
          exact
          path="/signin"
          element={
            <Suspense fallback={<Loader />}>
              <Signin />
            </Suspense>
          }
        />
        <Route
          exact
          path="/signup"
          element={
            <Suspense fallback={<Loader />}>
              <Signup />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
