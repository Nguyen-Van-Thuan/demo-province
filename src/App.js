import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "./pages/Checkout";
import FormProvinces from "./pages/FormProvinces";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormProvinces />} />
        <Route path="check-out" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
