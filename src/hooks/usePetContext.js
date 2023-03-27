// Hooks
import { PetContext } from "../context/PetContext"
import { useContext } from "react"

// Hook to check if the pet context within the context provider
export const usePetContext = () => {
  const context = useContext(PetContext)

  if (!context) {
    throw Error("usePetContext must be used inside of PetContextProvider")
  }

  return context
}
