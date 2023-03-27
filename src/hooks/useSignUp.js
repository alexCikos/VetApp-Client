// Hooks
import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

// Custom hook to sign up a user
export const useSignup = () => {
  // Setting the states
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(null)
  // Grabbing the dispatch function from the useAuthContext function
  const { dispatch } = useAuthContext()

  // Sign up function, taking in the user infomation from the body
  const signup = async (email, password, firstName, lastName, address, phoneNumber) => {
    // Setting the states
    setLoading(true)
    setError(null)

    // Using the fetch function to access the sign up route
    const response = await fetch("/signup", {
      // Setting the request to a post request
      method: "POST",
      // Setting the content-type to "application/json"
      headers: { "Content-Type": "application/json" },
      // Setting the body and grabbing the user infomation from the user
      body: JSON.stringify({ email, password, firstName, lastName, address, phoneNumber })
    })

    // Turning the response to json
    const json = await response.json()

    // If the response has no value, it excutes this block of code
    if (!response.ok) {
      setLoading(false)
      setError(json.error)
    }

    // If the response has a value, it excutes this block of code
    if (response.ok) {
      // Save the user to local storage
      localStorage.setItem("user", JSON.stringify(json))

      // Update the status auth context
      dispatch({ type: "LOGIN", payload: json })

      setLoading(false)
    }
  }

  // Returning the functions when the hook is called
  return { signup, isLoading, error }
}
