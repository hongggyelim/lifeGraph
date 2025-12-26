import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import MainPage from "./pages/main";
import ResultPage from "./pages/result";
import NotFound from "./pages/not-found";
import Footer from "./components/footer/footer";

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
