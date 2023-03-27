// Hooks
import { createContext, useReducer, useEffect } from "react"

// Accessing createContext
export const AuthContext = createContext()

// Reducer function to change the state
export const authReducer = (state, action) => {
  // Switch case that checks the action type and returns the new state
  switch (action.type) {
    // LOGIN will change the state, with user infomation applied to the user object
    case "LOGIN":
      // Changes the user state object, found in the AuthContextProvider, with a payload/infomation
      // action.payload is the information
      return { user: action.payload }
    // LOGOUT will change the user state to null
    case "LOGOUT":
      return { user: null }
    // Just return the intial state value
    default:
      return state
  }
}

// Function that sets the state of the app component
export const AuthContextProvider = ({ children }) => {
  // useReducer hook that sets the initial state, here its setting the user state to null
  // next it has dispatch function which is the authReducer function, here the state
  // can be changed, depending on the action types, from the switch case
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  // Setting the state to local storage, this feature allows the user to exit
  // the application and return to it without having to log back in again
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (user) {
      dispatch({ type: "LOGIN", payload: user })
    }
  }, [])

  console.log("AuthContext state:", state)

  // Will return the state to the childeren prop, this prop is the app component
  // therefore the whole app will have access to the states and authReducer function,
  // represented as the dispatch in the values
  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>
}
