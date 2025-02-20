import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import MainPage from "./pages/Main";
import ResultPage from "./pages/Result";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <Header />
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
