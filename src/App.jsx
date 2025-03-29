import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import UserList from "./pages/UserList";
import { Toaster } from "react-hot-toast";
import UserDetails from "./pages/UserDetails";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<UserList />}></Route>
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
        <Toaster position="top-center" />
      </BrowserRouter>
    </>
  );
};

export default App;
