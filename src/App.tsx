import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import NavBar from "./component/navbar/NavBar";
import Footer from "./component/footer/Footer";

const HelloWorld = lazy(() => import("./page/HelloWorld"));

function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Suspense fallback={<Dashboard />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/helloworld" element={<HelloWorld />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Footer/>
    </>
  );
}

export default App;
