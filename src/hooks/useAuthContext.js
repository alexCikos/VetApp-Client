import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

// Function that checks if the AuthContext function with within the AuthContextProvider
export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider")
  }

  return context
}
