import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home-page";
import MainPage from "./pages/main-page";
import ResultPage from "./pages/result-page";
import NotFound from "./pages/not-found-page";
import Footer from "./components/footer-component/footer-component";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="*" element={<NotFound />} /> {/* 404 페이지 */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
