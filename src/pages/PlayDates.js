import React, { useState, useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const PlayDates = () => {
  const [playDates, setPlayDates] = useState([])
  const [owners, setOwners] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchPlayDates = async () => {
      try {
        const response = await fetch(`https://vetapp117-api.onrender.com/getUserPlaydates`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        const data = await response.json()
        setPlayDates(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPlayDates()
  }, [user.token])

  useEffect(() => {
    const fetchOwners = async () => {
      const ownerPromises = playDates.map(async playDate => {
        const senderResponse = await fetch(`https://vetapp117-api.onrender.com/getUser/${playDate.sender}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        const senderData = await senderResponse.json()

        const recipientResponse = await fetch(`https://vetapp117-api.onrender.com/getUser/${playDate.recipient}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        const recipientData = await recipientResponse.json()

        // Create an object with the owner's first name for each play date
        return {
          [playDate._id]: {
            sender: senderData.firstName,
            recipient: recipientData.firstName
          }
        }
      })

      // Wait for all the owner fetch requests to resolve before updating the state
      const ownersArray = await Promise.all(ownerPromises)
      const ownersObject = Object.assign({}, ...ownersArray)
      setOwners(ownersObject)
    }

    fetchOwners()
  }, [playDates, user.token])

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(`https://vetapp117-api.onrender.com/getCurrentUser`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        const data = await response.json()
        setCurrentUser(data)
        console.log(currentUser._id)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCurrentUser()
  }, [currentUser._id, user.token])

  const handleReject = async playDateId => {
    try {
      const response = await fetch(`https://vetapp117-api.onrender.com/rejectPlayDate/${playDateId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      const data = await response.json()
      console.log(data)

      // Update the playDates state with the updated status
      const updatedPlayDates = playDates.map(playDate => {
        if (playDate._id === playDateId) {
          return {
            ...playDate,
            status: "rejected"
          }
        }
        return playDate
      })
      setPlayDates(updatedPlayDates)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAccept = async playDateId => {
    try {
      const response = await fetch(`https://vetapp117-api.onrender.com/acceptPlayDate/${playDateId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      const data = await response.json()
      console.log(data)

      // Update the playDates state with the updated status
      const updatedPlayDates = playDates.map(playDate => {
        if (playDate._id === playDateId) {
          return {
            ...playDate,
            status: "accepted"
          }
        }
        return playDate
      })
      setPlayDates(updatedPlayDates)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async playDateId => {
    try {
      const response = await fetch(`https://vetapp117-api.onrender.com/deletePlayDate/${playDateId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      const data = await response.json()
      console.log(data) // logging the response data for debugging purposes
      setPlayDates(prevPlayDates => prevPlayDates.filter(playDate => playDate._id !== playDateId))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2>Suss your PlayDates!</h2>
      <div className="PlayDates">
        {playDates.map(playDate => (
          <div className="PlayDate">
            <p>
              <strong>SENDER:</strong> {owners[playDate._id]?.sender}
            </p>
            <p>
              <strong>RECPIENT:</strong> {owners[playDate._id]?.recipient}
            </p>
            <p>
              <strong>MESSAGE:</strong> {playDate.message}
            </p>
            <p>
              <strong>STATUS:</strong> {playDate.status}
            </p>
            {currentUser._id === playDate.recipient && <button onClick={() => handleAccept(playDate._id)}>Accept</button>}
            {currentUser._id === playDate.recipient && <button onClick={() => handleReject(playDate._id)}>Reject</button>}

            <button onClick={() => handleDelete(playDate._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlayDates
