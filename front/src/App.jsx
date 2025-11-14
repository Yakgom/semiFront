import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./component/Common/Footer/Footer";
import Header from "./component/Common/Header/Header";
import Home from "./component/Common/Home/Home";
import Board from "./component/Boards/Board/Board";
import BoardForm from "./component/Boards/Board/BoardForm";
import BoardDetail from "./component/Boards/Board/BoardDetail";
import ImgBoard from "./component/Boards/ImgBoard/ImgBoard";
import ImgBoardForm from "./component/Boards/ImgBoard/ImgBoardForm";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/boards" element={<Board />} />
        <Route path="/boards/write" element={<BoardForm />} />
        <Route path="/boards/:id" element={<BoardDetail />} />
        <Route path="/boards/imgBoard" element={<ImgBoard  />} />
        <Route path="/boards/imgBoard/write" element={<ImgBoardForm />} />
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;
