import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import UserList from "./pages/UserList";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<UserList />}></Route>
        </Routes>
        <Toaster position="top-center" />
      </BrowserRouter>
    </>
  );
};

export default App;
