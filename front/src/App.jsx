import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./component/Common/Footer/Footer";
import Header from "./component/Common/Header/Header";
import Home from "./component/Common/Home/Home";
import AdminHome from "./Admin/Pages/AdminHome";
import Join from "./component/Member/Join/Join";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  const isJoin = location.pathname.startsWith("/members/join");
  return (
    <>
      {!isJoin && !isAdminPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<AdminHome />} />
        <Route path="/members/join" element={<Join />} />
      </Routes>
      {!isJoin && !isAdminPage && <Footer />}
    </>
  );
}

export default App;
