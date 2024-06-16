import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import ForecastCompletionPage from "./pages/ForecastCompletionPage/ForecastCompletionPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import {
  FORECAST_COMPLETION__PAGE_PATH,
  LICENSE_PAGE_PATH,
  SCENARIOS_PAGE_PATH,
} from "./constants/pagePath";
import LicensePage from "./pages/LicensePage/LicensePage";
import ScenarioPage from "./pages/ScenarioPage/ScenarioPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: FORECAST_COMPLETION__PAGE_PATH,
        element: <ForecastCompletionPage />,
        errorElement: <ForecastCompletionPage />,
      },
      {
        path: LICENSE_PAGE_PATH,
        element: <LicensePage />,
        errorElement: <NotFoundPage />,
      },
      {
        path: SCENARIOS_PAGE_PATH,
        element: <ScenarioPage />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
