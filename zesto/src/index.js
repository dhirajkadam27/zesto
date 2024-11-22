import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import SplashScreen from "./pages/Splash";
import Home from "./pages/Home";
import View from "./pages/View";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/home" element={<Home />} />
      <Route path="/view/:id" element={<View />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);