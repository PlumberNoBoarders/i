
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// styles for this kit
import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss?v=1.5.0";
import "./assets/demo/demo.css?v=1.5.0";
import "./assets/demo/nucleo-icons-page-styles.css?v=1.5.0";
// pages for this kit
import Index from "views/Index.js";
import NucleoIcons from "./views/NucleoIcons.js";
import LoginPage from "./views/examples/LoginPage.js";
import SignUp from "./views/index-sections/SignUp";
import OtpAuthenitacteForNewOtps from "./views/index-sections/OtpAuthenitacteForNewOtps";
import OtpAuthenitacteForPasswordResetors from "./views/index-sections/OtpAuthenitacteForPasswordResetors";
import LandingPage from "./views/examples/LandingPage.js";
import BalanceSheet from "./views/examples/BalanceSheet.js";
import ProfilePage from "./views/examples/ProfilePage.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Index />}/>
      </Route>
      <Route path="/nucleo-icons" element={<NucleoIcons />} />
      <Route path="/landing-page" element={<LandingPage />} />
      <Route path="/profile-page" element={<ProfilePage />} />
      <Route path="/Balance-sheet" element={<BalanceSheet />} />
      <Route path="/login-page" element={<LoginPage />} />
      <Route path="/signup-page" element={<SignUp />} />
      <Route path="/new_otp" element={<OtpAuthenitacteForNewOtps />} />
      <Route path="/reset_password" element={<OtpAuthenitacteForPasswordResetors />} />
     
    </Routes>
  </BrowserRouter>
);
