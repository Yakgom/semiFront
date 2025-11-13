import { useNavigate } from "react-router-dom";

const AdminList = () => {
  const navi = useNavigate();
  return (
    <>
      <div
        onClick={() => {
          navi("/adminList");
        }}
      ></div>
    </>
  );
};

export default AdminList;
