import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

import UserHomeScreen from "./screens/user/UserHomeScreen.jsx";
import UserLoginScreen from "./screens/user/UserLoginScreen.jsx";
import ProfileScreen from "./screens/user/ProfileScreen.jsx";
import UserRegisterScreen from "./screens/user/UserRegisterScreen.jsx";
import AdminLoginScreen from "./screens/admin/AdminLoginScreen.jsx";
import AdminHomeScreen from "./screens/admin/AdminHomeScreen.jsx";
import AdminUserScreen from "./screens/admin/AdminUserScreen.jsx";
import AdminSubscripctionsScreen from "./screens/admin/AdminSubscripctionsScreen.jsx";
import AdminTokenScreen from "./screens/admin/AdminTokenScreen.jsx";
import EmailVerification from "./components/user/EmailVerification.jsx";
import ForgotPassowordScreen from "./screens/user/ForgotPassowordScreen.jsx";
import NewPasswordSettingScreeen from "./screens/user/NewPasswordSettingScreeen.jsx";
import ErrorPage from "./components/user/ErrorPage.jsx";
import UserInterestScreen from "./screens/user/UserInterestScreen.jsx";
import UserMatchListScreen from "./screens/user/UserMatchListScreen.jsx";
import UserPrivateRoutes from "./components/user/UserPrivateRoutes.jsx";
import AdminPrivateRoute from "./components/admin/AdminPrivateRoute.jsx";
import UserProfileScreen from "./screens/user/UserProfileScreen.jsx";
import UserSubscripctionScreen from "./screens/user/UserSubscripctionScreen.jsx";
import UserShortlistScreen from "./screens/user/UserShortlistScreen.jsx";
import Chatscreen from "./screens/user/Chatscreen.jsx";
import VideoChatRoom from "./components/chat/VideoCall/VideoChatRoom.jsx";
import RegistrationDetails from "./components/user/RegistrationDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <UserHomeScreen />,
      },
      {
        path: "/register",
        element: <UserRegisterScreen />,
      },
      {
        path: "login",
        element: <UserLoginScreen />,
      },
      {
        path: "otp",
        element: <EmailVerification />,
      },

      {
        path: "userdetails",
        element: <RegistrationDetails />,
      },
      {
        path: "forgotpassword",
        element: <ForgotPassowordScreen />,
      },
      {
        path: "profile",
        element: <UserPrivateRoutes />,
        children: [
          {
            index: true,
            element: <ProfileScreen />,
          },
        ],
      },
      {
        path: "enterpassword",
        element: <NewPasswordSettingScreeen />,
      },

      {
        path: "interests",
        element: <UserPrivateRoutes />,
        children: [
          {
            index: true,
            element: <UserInterestScreen />,
          },
        ],
      },
      {
        path: "matches",
        element: <UserPrivateRoutes />,
        children: [
          {
            index: true,
            element: <UserMatchListScreen />,
          },
        ],
      },

      {
        path: "userprofile/:userId",
        element: <UserPrivateRoutes />,
        children: [
          {
            index: true,
            element: <UserProfileScreen />,
          },
        ],
      },

      {
        path: "subscriptions",
        element: <UserPrivateRoutes />,
        children: [
          {
            index: true,
            element: <UserSubscripctionScreen />,
          },
        ],
      },
      {
        path: "chat",
        element: <UserPrivateRoutes />,
        children: [
          {
            index: true,
            element: <Chatscreen />,
          },
        ],
      },

      {
        path: "videocall/:roomId",
        element: <UserPrivateRoutes />,
        children: [
          {
            index: true,
            element: <VideoChatRoom />,
          },
        ],
      },

      {
        path: "shortlists",
        element: <UserPrivateRoutes />,
        children: [
          {
            index: true,
            element: <UserShortlistScreen />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <AdminLoginScreen />,
      },
      {
        path: "dashboard",
        element: <AdminPrivateRoute />,
        children: [
          {
            index: true,
            element: <AdminHomeScreen />,
          },
        ],
      },
      {
        path: "users",
        element: <AdminPrivateRoute />,
        children: [
          {
            index: true,
            element: <AdminUserScreen />,
          },
        ],
      },
      {
        path: "subscriptions",
        element: <AdminPrivateRoute />,
        children: [
          {
            index: true,
            element: <AdminSubscripctionsScreen />,
          },
        ],
      },
      {
        path: "token",
        element: <AdminPrivateRoute />,
        children: [
          {
            index: true,
            element: <AdminTokenScreen />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="335701153084-isgpveaqbmual67f8m29pf8be4fh1oce.apps.googleusercontent.com">
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
