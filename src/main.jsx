import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./variables.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./assets/fonts/Nunito-VariableFont_wght.ttf";
import "./assets/fonts/Nunito-Italic-VariableFont_wght.ttf";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
