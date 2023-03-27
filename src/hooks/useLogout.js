// Hooks
import { useAuthContext } from "./useAuthContext"
import { usePetContext } from "../hooks/usePetContext"

// Custom hook to logout a user
export const useLogout = () => {
  // Grabbing the dispatch functions from both of the contexts
  const { dispatch } = useAuthContext()
  const { dispatch: petsDispatch } = usePetContext()

  // Functions logouts the user
  const logout = () => {
    // Remove user from storage
    localStorage.removeItem("user")

    // Dispatch logout action
    dispatch({ type: "LOGOUT" })
    petsDispatch({ type: "SET_PETS", payload: [] })
  }

  // Returns the logout function
  return { logout }
}
