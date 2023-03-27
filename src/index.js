import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { AuthContextProvider } from "./context/AuthContext"
import { PetContextProvider } from "./context/PetContext"

import { disabledReactDevTools } from "@fvilers/disable-react-devtools"

if (process.env.NODE_ENV === "production") disabledReactDevTools()

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PetContextProvider>
        <App />
      </PetContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
