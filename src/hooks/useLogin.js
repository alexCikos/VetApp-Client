// Hooks
import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

// Function to handle login
export const useLogin = () => {
  // Setting the states
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(null)

  // Grabbing the dispatch function from the useAuthContext
  const { dispatch } = useAuthContext()

  // login function
  const login = async (email, password) => {
    // Setting the state
    setLoading(true)
    setError(null)

    // Using the fetch function to use the login route from the backend
    const response = await fetch("https://vetapp117-api.onrender.com/login", {
      // Setting the fetch to a post request
      method: "POST",
      // Setting the headers
      headers: { "Content-Type": "application/json" },
      // Parsing in the body of the request
      body: JSON.stringify({ email, password })
    })

    // Taking the body of the request into JSON format
    const json = await response.json()

    // Checking to see reponse has a value
    if (!response.ok) {
      setLoading(false)
      setError(json.error)
    }

    // If the response has a value, it excutes the next block of code
    if (response.ok) {
      // Save the user to local storage
      localStorage.setItem("user", JSON.stringify(json))

      // Update the status auth context
      dispatch({ type: "LOGIN", payload: json })

      setLoading(false)
    }
  }

  // Returing the functions from the Hook
  return { login, isLoading, error }
}
