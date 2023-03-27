// Hooks
import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { usePetContext } from "../hooks/usePetContext"

// Componets
import PetDetails from "../components/PetDetails"
import PetForm from "../components/PetForm"

// Home page
const Home = () => {
  // Grabbing the states and dispatch functions from contexts
  const { pets, dispatch } = usePetContext()
  const { user } = useAuthContext()

  // A function to fetch pets, acessing the getPets route
  const fetchPets = async () => {
    const response = await fetch("https://vetapp117-api.onrender.com/getPets", {
      // Setting authorization header with the user token
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }).catch(error => console.log(error))

    // Grabbing the repsonse and parsing it into json
    const json = await response.json()

    // if the response has a value, it does a dispatch function to set the
    // sate of the pets
    if (response.ok) {
      dispatch({ type: "SET_PETS", payload: json })
    }
  }

  // This function loads everytime the DOM renders
  useEffect(() => {
    // If the user has value it excutes the fetchPets function
    if (user) {
      fetchPets()
    }
  }, [user, fetchPets])

  // JSX of the home page
  return (
    <div className="home">
      <div className="workouts">
        {/* If pets has a value, it maps over each item in the pets collection */}
        {pets &&
          pets.map(pet => (
            // Calling in the petsDetails component while passing the pet prop
            <PetDetails
              key={pet._id}
              pet={pet}
            />
          ))}
      </div>
      {/* The petForm component */}
      <PetForm />
    </div>
  )
}

export default Home
