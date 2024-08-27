import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "@components/Header";
import Loader from "@components/Loader";
const Signin = lazy(() => import("@pages/Signin"));
const Signup = lazy(() => import("@pages/Signup"));

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
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

export default App;
