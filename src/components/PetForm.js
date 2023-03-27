// Hooks
import { useState } from "react"
import { usePetContext } from "../hooks/usePetContext"
import { useAuthContext } from "../hooks/useAuthContext"

// PetForm component
const PetForm = () => {
  // Setting the state and acessing the dispatch/states from the contexts
  const { dispatch } = usePetContext()
  const [name, setName] = useState("")
  const [breed, setBreed] = useState("")
  const [age, setAge] = useState("")
  const [photo, setPhoto] = useState(null)
  const [error, setError] = useState(null)
  const { user } = useAuthContext()

  // Handles what happens when the user submits the pet form
  const handleSubmit = async e => {
    // Prevents the page from reloading
    e.preventDefault()

    // If the user state has no value, it exits out of the function
    if (!user) {
      setError("You must be logged in")
      return
    }

    // Creating a new FormData instance and appending the pet information and photo to it
    const formData = new FormData()
    formData.append("name", name)
    formData.append("breed", breed)
    formData.append("age", age)
    formData.append("photo", photo)

    // Accessing the createPet route
    const response = await fetch("https://VetApp117-api.com/createPet", {
      // Setting the request to a post request and sending the FormData instance as the body
      method: "POST",
      body: formData,
      // Setting the headers of the post request
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })

    // Grabbing the response and setting it to json
    const json = await response.json()

    // If the response has no value, it executes the next block of code
    if (!response.ok) {
      setError(json.error)
    }

    // If the reponse has a value, it executes the next block of code
    if (response.ok) {
      setError(null)
      console.log("new pet added", json)
      setName("")
      setBreed("")
      setAge("")
      setPhoto(null)

      // Excutes the dispatch, with json to update the state
      dispatch({ type: "CREATE_PET", payload: json })
    }
  }

  // The jsx for petform
  return (
    <form
      onSubmit={handleSubmit}
      className="create"
    >
      <h3>Add a New Pet</h3>

      {/* Setting the email, so it can be in the state */}
      <label>Pet Name:</label>
      <input
        type="text"
        // This how you the put the value into the state
        onChange={e => setName(e.target.value)}
        value={name}
      ></input>

      <label>Pet Breed:</label>
      <input
        type="text"
        onChange={e => setBreed(e.target.value)}
        value={breed}
      ></input>

      <label>Pet Age:</label>
      <input
        type="number"
        onChange={e => setAge(e.target.value)}
        value={age}
      ></input>

      <label>Upload Photo:</label>
      <input
        type="file"
        onChange={e => setPhoto(e.target.files[0])}
      ></input>

      <button>Add Pet</button>

      {/* If error is true, it returns a div, with the error message */}
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default PetForm
