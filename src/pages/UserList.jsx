import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const baseURL = import.meta.env.VITE_APP_BASE_URL;
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.token;

  useEffect(() => {
    if (token) {
      loadData();
    } else {
      navigate("/login");
    }
  }, [token]);

  const loadData = async () => {
    try {
      const result = await fetch(`${baseURL}/api/users?page=1`);
      const data = await result.json();
      console.log(data);
      if (data) {
        setUserData(data.data);
      } else {
        console.error("No Data");
      }
    } catch (error) {
      console.log("Error while fetching data: ", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div id="container" className="h-auto w-full px-16 py-6">
        <div
          id="header"
          className="w-full  rounded-xl p-2 flex items-center justify-between"
        >
          <h1 id="title" className="text-3xl font-mono">
            Employ.Reqres
          </h1>
          <div
            id="buttons"
            className="w-auto p-2 flex items-center justify-between gap-3"
          >
            <a
              href="https://github.com/sumitkrjha/EmployReqres"
              target="_blank"
            >
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
        <div id="userContainer" className="w-full h-screen p-5 ">
          <input
            type="text"
            placeholder="Search by username.."
            className="w-72 h-12 p-2 border-2 border-black placeholder:text-md placeholder:text-black rounded-full"
          />
          <button className="ml-2 bg-red-500 p-2 rounded-full text-white w-32 h-12 hover:bg-red-700">
            Clear Filters
          </button>
          <div
            id="cardContainer"
            className="mt-2 w-full grid md:grid-cols-3 grid-cols-1 place-items-center"
          >
            {userData.length > 0 ? (
              userData.map((user, index) => {
                return (
                  <div
                    key={index}
                    className=" border-2 border-gray-600 h-auto w-72 rounded-3xl p-5 m-3 flex flex-col items-center justify-center gap-2"
                  >
                    <img src={user.avatar} alt="" />
                    <h1>
                      {user.first_name} {user.last_name}
                    </h1>
                    <h3>{user.email}</h3>
                    <button className="w-20 p-2 bg-gray-500 rounded-lg font-semibold hover:bg-gray-600 ">
                      Edit
                    </button>
                    <button className="w-20 p-2 bg-red-500 rounded-lg font-semibold text-white hover:bg-red-700 ">
                      Delete
                    </button>
                  </div>
                );
              })
            ) : (
              <span>Loading...</span>
            )}
          </div>
          <div
            id="paginationContainer"
            className="mt-2 p-2 w-full flex items-center justify-center gap-4"
          >
            <button className="w-20 bg-violet-700 p-2 rounded-3xl font-semibold text-white">
              Prev
            </button>
            <p>Page 1/2</p>
            <button className="w-20 bg-violet-700 p-2 rounded-3xl font-semibold text-white">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
