import React from "react";
import ReactDOM from "react-dom/client";
// import "./assets/styles/bootstrap.custom.css";
// import "./assets/styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './assets/styles/index.css';
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import HomeScreen from "./screens/HomeScreen";
//import ProductScreen from "./screens/old/ProductScreen";
import { Provider } from "react-redux";
import store from "./store";
import BookingScreen from "./screens/old/BookingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SpecialistScreen from "./screens/specialist/SpecialistScreen";
import BlogScreen from "./screens/blog/BlogScreen";
import BlogDetailScreen from "./screens/blog/BlogDetailScreen";
//import CheckCoverageScreen from "./screens/old/CheckCoverageScreen";
import FindPackageScreen from "./screens/old/FindPackageScreen";
import SpecialistDetailScreen from "./screens/specialist/SpecialistDetailScreen";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import BlogListScreen from "./screens/admin/BlogListScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import AppointmentListScreen from "./screens/admin/AppointmentListScreen";
import SpecialistListScreen from "./screens/admin/SpecialistListScreen";
import UserDashboard from "./screens/UserDashboard";
import PrivacyPolicyScreen from "./screens/legal/PrivacyPolicyScreen";
import TermsOfUseScreen from "./screens/legal/TermsOfUseScreen";
import UserEditScreen from "./screens/admin/UserEditScreen";
import BlogEditScreen from "./screens/admin/BlogEditScreen";
import AppointmentEditScreen from "./screens/admin/AppointmentEditScreen";
import SpecialistEditScreen from "./screens/admin/SpecialistEditScreen";
import RegisterDoctorScreen from "./screens/RegisterDoctorScreen";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      {/* <Route path="/screening/:id" element={<ProductScreen />} /> */}
      <Route path="/booking" element={<BookingScreen />} />
      <Route path="/blogs" element={<BlogScreen />} />
      <Route path="/blogs/:id" element={<BlogDetailScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/doctorsignup" element={<RegisterDoctorScreen />} />
      <Route path="/termsofuse" element={<TermsOfUseScreen />} />
      <Route path="/privacypolicy" element={<PrivacyPolicyScreen />} />
      <Route path="/newsletter" element={<HomeScreen />} />
      <Route path="/pfeedback" element={<HomeScreen />} />

      <Route path="/specialists" element={<SpecialistScreen />} />
      <Route path="/specialists/:keyword" element={<SpecialistScreen />} />
      <Route
        path="/specialists/page/:pageNumber"
        element={<SpecialistScreen />}
      />
      <Route
        path="/specialists/profile/:id"
        element={<SpecialistDetailScreen />}
      />

      <Route
        path="/specialists/:keyword/page/:pageNumber"
        element={<SpecialistScreen />}
      />

      <Route path="/findpackage" element={<FindPackageScreen />} />
      {/* <Route path="/checkcoverage" element={<CheckCoverageScreen />} /> */}

      <Route path="" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/dashboard/:id" element={<UserDashboard />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/bloglist" element={<BlogListScreen />} />
        <Route path="/admin/blog/:id/edit" element={<BlogEditScreen />} />
        <Route
          path="/admin/appointmentlist"
          element={<AppointmentListScreen />}
        />
        <Route
          path="/admin/appointment/:id/edit"
          element={<AppointmentEditScreen />}
        />
        <Route
          path="/admin/specialistlist"
          element={<SpecialistListScreen />}
        />
        <Route
          path="/admin/specialistlist/:keyword"
          element={<SpecialistListScreen />}
        />
        <Route
          path="/admin/specialistlist/page/:pageNumber"
          element={<SpecialistListScreen />}
        />
        <Route
          path="/admin/specialistlist/:keyword/page/:pageNumber"
          element={<SpecialistListScreen />}
        />
        <Route
          path="/admin/specialists/:id/edit"
          element={<SpecialistEditScreen />}
        />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
      </Route>
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
