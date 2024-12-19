import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./component/navbar/NavBar";
import Footer from "./component/footer/Footer";
import SkeletonPage from "./page/skeleton/SkeletonPage";

const Dashboard = lazy(() => import("./page/Dashboard"));

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Suspense fallback={<SkeletonPage />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<SkeletonPage />} />
            <Route path="/merchants" element={<SkeletonPage />} />
            <Route path="/transactions" element={<SkeletonPage />} />
            <Route path="/voucers" element={<SkeletonPage />} />
            <Route path="/coins" element={<SkeletonPage />} />
            <Route path="/assets" element={<SkeletonPage />} />
            <Route path="/settings" element={<SkeletonPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
