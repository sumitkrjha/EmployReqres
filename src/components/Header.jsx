import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("users");
    toast.success("Logout successfull!");
    navigate("/login");
  };
  return (
    <>
      <div
        id="header"
        className="w-full rounded-xl p-2 gap-4 md:gap-0 flex flex-col md:flex-row items-center justify-between"
      >
        <h1 id="title" className="text-3xl font-mono">
          Employ.Reqres
        </h1>
        <div
          id="buttons"
          className="w-auto p-2 flex items-center justify-between gap-3"
        >
          <a href="https://github.com/sumitkrjha/EmployReqres" target="_blank">
            <button className="w-28 bg-gray-700 p-2 rounded-xl font-semibold text-white hover:bg-gray-800">
              GitHub
            </button>
          </a>
          <button
            className="w-28 bg-red-500 p-2 rounded-xl font-semibold text-white hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
