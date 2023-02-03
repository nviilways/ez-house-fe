import { Route, Routes } from "react-router-dom";
import "./App.scss";
import NavBar from "./component/NavBar";
import CreateHouse from "./pages/CreateHouse";
import HouseList from "./pages/HouseList";
import HousePage from "./pages/HousePage";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import ProtectedPage from "./pages/ProtectedPage";
import Register from "./pages/Register";
import TopUp from "./pages/TopUp";
import { ToastContainer } from "react-toastify";
import PageNotFound from "./pages/PageNotFound";
import CreateReservation from "./pages/CreateReservation";
import Home from "./pages/Home";
import ReservationDetail from "./pages/ReservationDetail";
import Reservation from "./pages/Reservation";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<NavBar />}>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/house/:id" element={<HousePage />} />
          <Route element={<ProtectedPage />}>
            <Route path="/houses" element={<HouseList />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/reservation" element={<Reservation />} />  /
            <Route path="/reservation/:id" element={<ReservationDetail />} /> 
            <Route path="/top-up" element={<TopUp />} />
            <Route path="/house/create" element={<CreateHouse />} />
            <Route
              path="/house/:id/reservation"
              element={<CreateReservation />}
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
