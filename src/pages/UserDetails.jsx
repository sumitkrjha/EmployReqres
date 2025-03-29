import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/userSlice";
import toast from "react-hot-toast";
import Footer from "../components/Footer";
const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baseURL = import.meta.env.VITE_APP_BASE_URL;

  const user = useSelector((state) =>
    state.users.data.find((u) => u.id === parseInt(id))
  );

  // Initialize state with existing user data
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  if (!user) return <p className="text-center text-xl">User not found!</p>;

  const handleUpdate = async () => {
    if (
      firstName === user.first_name &&
      lastName === user.last_name &&
      email === user.email
    ) {
      toast.error("Please change any value to edit.");
      return;
    }
    setLoading(true);
    const data = JSON.stringify({
      email: email,
      first_name: firstName,
      last_name: lastName,
    });
    try {
      const response = await fetch(`${baseURL}/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      if (response.ok) {
        const updatedUser = await response.json();
        dispatch(
          updateUser({
            id,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            email: updatedUser.email,
          })
        );
        toast.success("User updated successfully!");
        navigate("/");
      } else {
        alert("Failed to update user!");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <Link to="/">
        <button className="mb-3 p-2 border-2 rounded-3xl bg-red-500 text-white font-semibold">
          {" "}
          ← Back to home
        </button>
      </Link>
      <h1 className="text-3xl font-bold mb-4">Edit User</h1>
      <div className="mb-2 border border-black p-4 rounded-lg">
        <p className="text-xl font-semibold text-center mb-2">
          {user.first_name} {user.last_name}
        </p>

        <div id="image" className="w-full flex items-center justify-center">
          <img src={user.avatar} alt="" />
        </div>

        <label className="block mt-4">First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border p-2 w-full rounded-md"
        />

        <label className="block mt-4">Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border p-2 w-full rounded-md"
        />

        <label className="block mt-4">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded-md"
        />

        <button
          className="bg-blue-500 text-white p-2 rounded-md w-full mt-4 hover:bg-blue-700"
          onClick={handleUpdate}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update User"}
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default UserDetails;
