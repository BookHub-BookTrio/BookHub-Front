import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "../src/pages/Test.jsx";
import Home from "../src/pages/home/Home.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;