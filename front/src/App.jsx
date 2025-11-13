import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./component/Common/Footer/Footer";
import Header from "./component/Common/Header/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Header />
      <Routes>
        <Route path="/" />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
