// Hooks
import { createContext, useReducer } from "react"

// Accessing the create context function
export const PetContext = createContext()

// The reducer function
export const petReducer = (state, action) => {
  // Switch case to set the state of pets
  switch (action.type) {
    case "SET_PETS":
      // Returns the new state of a pet
      return {
        pets: action.payload
      }
    // Creates a new pet and spreads it into the intial state
    case "CREATE_PET":
      return {
        pets: [action.payload, ...state.pets]
      }
    // Deletes the pet from the state, using its id
    case "DELETE_PET":
      return {
        pets: state.pets.filter(p => p._id !== action.payload._id)
      }
    default:
      return state
  }
}

// A function that is uses the useReducer hook, that set within a context provider
// it allows us to access the state throughout the whole application
export const PetContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(petReducer, {
    pets: []
  })

  return <PetContext.Provider value={{ ...state, dispatch }}>{children}</PetContext.Provider>
}
