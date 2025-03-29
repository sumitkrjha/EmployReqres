import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, fetchUsers, setPage } from "../redux/userSlice";
import toast from "react-hot-toast";
import Header from "../components/Header";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_APP_BASE_URL;
  const { data, page, perPage, loading, hasFetched } = useSelector(
    (state) => state.users
  );
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (!hasFetched) {
      dispatch(fetchUsers());
    }
  }, [dispatch, token, hasFetched]);

  // Filter users based on search input
  const filteredUsers = data.filter((user) =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Reset pagination when search query changes
  useEffect(() => {
    dispatch(setPage(1));
  }, [searchQuery, dispatch]);

  const handleDelete = async (id) => {
    toast.success("started deleting");
    try {
      const response = await fetch(`${baseURL}/api/users/${id}`, {
        method: "DELETE",
      });

      console.log(response.status);
      if (response.status === 204) {
        dispatch(deleteUser(id));
        toast.success("Deleted Successfully!");
      } else {
        toast.error("Deletion not possible");
      }
    } catch (err) {
      toast.error(`Error while deleting: ${err.message}`);
    }
  };

  // Recalculate total pages based on filtered results
  const totalPages = Math.ceil(filteredUsers.length / perPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div id="container" className="h-auto w-full md:px-16 py-6">
      <Header />

      <div id="userContainer" className="w-full h-fit p-5">
        <input
          type="text"
          placeholder="Search by username.."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-72 h-12 p-2 border-2 border-black placeholder:text-md placeholder:text-black rounded-full"
        />
        {/* Clear Search Button */}
        <button
          className="mt-2 md:mt-0 ml-2 bg-red-500 p-2 rounded-full text-white w-32 h-12 hover:bg-red-700"
          onClick={() => setSearchQuery("")}
        >
          Clear Filters
        </button>

        {/* User Cards */}
        <div
          id="cardContainer"
          className="mt-12 w-full grid md:grid-cols-3 grid-cols-1 place-items-center"
        >
          {loading ? (
            <span>Loading...</span>
          ) : paginatedUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              <div
                key={user.id}
                className="border-2 border-gray-600 h-auto w-72 rounded-3xl p-5 m-3 flex flex-col items-center justify-center gap-2"
              >
                <img src={user.avatar} alt={user.first_name} />
                <h1>
                  {user.first_name} {user.last_name}
                </h1>
                <h3>{user.email}</h3>
                <Link to={`/user/${user.id}`}>
                  <button className="w-20 p-2 bg-gray-500 rounded-lg font-semibold hover:bg-gray-600">
                    Edit
                  </button>
                </Link>
                <button
                  className="w-20 p-2 bg-red-500 rounded-lg font-semibold text-white hover:bg-red-700"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-xl text-gray-500 font-semibold mt-4">
              No users found
            </p>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages == 0 ? (
          <></>
        ) : (
          <div
            id="paginationContainer"
            className="mt-2 p-2 w-full flex items-center justify-center gap-4"
          >
            <button
              className="w-20 bg-violet-700 p-2 rounded-3xl font-semibold text-white disabled:opacity-50"
              onClick={() => dispatch(setPage(page - 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <p>
              Page {page}/{totalPages}
            </p>
            <button
              className="w-20 bg-violet-700 p-2 rounded-3xl font-semibold text-white disabled:opacity-50"
              onClick={() => dispatch(setPage(page + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
