import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Location from "./pages/Location";
import NoMatch from "./pages/NoMatch";
import { Suspense } from "react";
import SpinnerFull from "./components/SpinnerFull";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<SpinnerFull />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="signup" element={<Signup />}></Route>
            <Route path="location/:id" element={<Location />}></Route>
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
