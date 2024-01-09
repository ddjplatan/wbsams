import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import PrivateRoute from "./components/PrivateRoute.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import DashboardScreen from "./screens/DashboardScreen.jsx";
import AdoptScreen from "./screens/AdoptScreen.jsx";
import AdoptionMonitoringScreen from "./screens/AdoptionMonitoringScreen.jsx";
import ManageUserScreen from "./screens/ManageUserScreen.jsx";
import DonationScreen from "./screens/DonationScreen.jsx";
import ViewPetsScreen from "./screens/ViewPetsScreen.jsx";
import AboutScreen from "./screens/AboutScreen.jsx";
import SpayNeuterScreen from "./screens/SpayNeuterScreen.jsx";
import SpayNeuterInstancesScreen from "./screens/SpayNeuterInstancesScreen.jsx";
import EventScreen from "./screens/EventScreen.jsx";
import NewsScreen from "./screens/NewsScreen.jsx";
import VolunteerScreen from "./screens/VolunteerScreen.jsx";
import VeterinarianScreen from "./screens/VeterinarianScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      {/* Private Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/adoption" element={<AdoptScreen />} />
        <Route path="/adopted" element={<AdoptionMonitoringScreen />} />
        <Route path="/news" element={<NewsScreen />} />


        <Route path="/volunteer" element={<VolunteerScreen />} />
        <Route path="/users" element={<ManageUserScreen />} />
        <Route path="/donation" element={<DonationScreen />} />
        <Route path="/pets" element={<ViewPetsScreen />} />
        <Route path="/about-us" element={<AboutScreen />} />
        <Route path="/spay-and-neuter" element={<SpayNeuterScreen />} />
        <Route path="/spay-and-neuter-admin" element={<SpayNeuterInstancesScreen />} />
        <Route path="/events" element={<EventScreen />} />
        <Route path="/veterinarian" element={<VeterinarianScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
