import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import ProtectedPage from "./pages/ProtectedPage";
import Register from "./pages/Register";

function App() {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedPage />}>
          <Route path="my-profile" element={<MyProfile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
