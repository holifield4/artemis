import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./component/navbar/NavBar";
import Footer from "./component/footer/Footer";
import SkeletonPage from "./page/skeleton/SkeletonPage";

const Dashboard = lazy(() => import("./page/Dashboard"));
const HelloWorld = lazy(() => import("./page/HelloWorld"));

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Suspense fallback={<SkeletonPage />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/skeleton" element={<SkeletonPage />} />
            <Route path="/helloworld" element={<HelloWorld />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
