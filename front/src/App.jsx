import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./component/Common/Footer/Footer";
import Header from "./component/Common/Header/Header";
import Home from "./component/Common/Home/Home";
import CarsSearchList from "./component/Cars/CarsSearchList";
import AdminList from "./component/Admin/layouts/AdminList";


function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Header />}

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cars/searchList" element={<CarsSearchList />} />
        <Route path="/admin/*" element={<AdminList />} />
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;
