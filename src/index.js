import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import StakeCloudax from "./StakeCloudax";
import ErrorPage from "./components/ErrorPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;
const appId = process.env.REACT_APP_MORALIS_APP_ID;

root.render(
  <React.StrictMode>
    <MoralisProvider serverUrl={serverUrl} appId={appId}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/staking" element={<StakeCloudax />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>

    </MoralisProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
