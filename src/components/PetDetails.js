// Hooks
import { useState, useEffect } from "react"
import { usePetContext } from "../hooks/usePetContext"
import { useAuthContext } from "../hooks/useAuthContext"

// PetDetails component, the pet prop is accessed, from the parent component
// meaning infomation is passed down to this component
const PetDetails = ({ pet }) => {
  // Accessing states and dispatch from the context
  const { dispatch } = usePetContext()
  const { user } = useAuthContext()

  // State for the authenticated image URL
  const [authenticatedImageURL, setAuthenticatedImageURL] = useState("")

  // Authenticating the image URL using useEffect hook
  useEffect(() => {
    const authenticateImageURL = async () => {
      if (user) {
        const response = await fetch(`https://vetapp117-api.onrender.com/${pet.photo}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: "image/*"
          }
        })
        if (response.ok) {
          setAuthenticatedImageURL(`https://vetapp117-api.onrender.com/${pet.photo}`)
        }
      }
    }
    authenticateImageURL()
  }, [pet.photo, user])

  // Handles what happens when the user clicks on elements
  const handleClick = async () => {
    // If the user has no value, it exits out of the function
    if (!user) {
      return
    }

    // Calls this route from the backend with the pet id
    const response = await fetch("https://vetapp117-api.onrender.com/deletePet/" + pet._id, {
      // Setting the route method to delete
      method: "DELETE",
      // Setting the headers with the authorization and token
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })

    // Grabbing the response into json
    const json = await response.json()

    // If reponse has value, it excutes the next block of code
    if (response.ok) {
      // Excutes the dispatch function, with the payload, using the json
      dispatch({ type: "DELETE_PET", payload: json })
    }
  }

  // The jsx for pet details
  return (
    <div className="workout-details">
      {/* Using the authenticatedImageURL state, which contains the authenticated image URL */}
      <h4>{pet.name}</h4>
      <img
        src={authenticatedImageURL}
        alt="pet"
      />

      <p>
        <strong>Pet Breed: </strong> {pet.breed}
      </p>
      <p>
        <strong>Pet age: </strong>
        {pet.age}
      </p>

      <span
        className="material-symbols-outlined"
        onClick={handleClick}
      >
        delete
      </span>
    </div>
  )
}

export default PetDetails
