import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import MainPage from "./pages/Main";
import ResultPage from "./pages/Result";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/main" Component={MainPage} />
        <Route path="/result" Component={ResultPage} />
      </Routes>
    </Router>
  );
}

export default App;
