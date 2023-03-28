import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const PetProfile = () => {
  const { id } = useParams()
  const [pet, setPet] = useState(null)
  const [owner, setOwner] = useState(null)
  const [playDateBtn, setPlayDateBtn] = useState(true)
  const [message, setMessage] = useState()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(`https://vetapp117-api.onrender.com/getPet/${id}`, {
          // Setting the route method to delete
          method: "GET",
          // Setting the headers with the authorization and token
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        const data = await response.json()
        setPet(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPet()
  }, [id, user.token])

  useEffect(() => {
    const fetchOwner = async () => {
      if (pet !== null) {
        try {
          const response = await fetch(`https://vetapp117-api.onrender.com/${pet.owner}`, {
            // Setting the route method to delete
            method: "GET",
            // Setting the headers with the authorization and token
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          })
          const data = await response.json()
          setOwner(data)
        } catch (error) {
          console.log(error)
        }
      }
    }

    fetchOwner()
  }, [pet, user.token])

  if (!pet) {
    return <div>Loading...</div>
  }

  const handleClick = async () => {
    const sendMessage = { message }

    try {
      await fetch(`https://vetapp117-api.onrender.com/sendPlayDate/${pet.owner}`, {
        // Setting the route method to delete
        method: "POST",
        body: JSON.stringify(sendMessage),
        // Setting the headers with the authorization and token
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      })
      setPlayDateBtn(false)
      setMessage("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="petProfile">
        <h1>{pet.name}</h1>
        <img src={`https://vetapp117-api.onrender.com/${pet.photo}`} />

        <p>
          <strong>Breed: </strong>
          {pet.breed}
        </p>
        <p>
          <strong>Age: </strong> {pet.age}
        </p>
        {owner && (
          <p>
            <strong>Owner: </strong> {owner.firstName}
          </p>
        )}
        <p>
          <strong>Write a Message to set up a Date and Time!</strong>
        </p>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        {playDateBtn ? <button onClick={handleClick}>Send a PlayDate</button> : <p>Play date sent!</p>}
      </div>
    </div>
  )
}

export default PetProfile
