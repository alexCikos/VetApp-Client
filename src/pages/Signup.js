// Hooks
import { useState } from "react"
import { useSignup } from "../hooks/useSignUp"

import PlacesAutocomplete, { geocodeByAddress } from "react-places-autocomplete"

// Sign up page
const Signup = () => {
  // Seeting the states for the different values
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  // Acessing the functions from the useSignup hook
  const { signup, error, isLoading } = useSignup()

  const handleSelect = async value => {
    const result = await geocodeByAddress(value)
    setAddress(value)
  }

  // handles the submit event, from the form
  const handleSubmit = async e => {
    // Stops the page from refreshing
    e.preventDefault()

    // Calls the sign up function the with values from the form
    await signup(email, password, firstName, lastName, address, phoneNumber)
  }

  return (
    <form
      className="signup"
      onSubmit={handleSubmit}
    >
      <h3>Sign up</h3>

      {/* Setting the email, so it can be in the state */}
      <label>Email:</label>
      <input
        type="email"
        // This how you the put the value into the state
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />

      <label>firstName:</label>
      <input
        type="text"
        onChange={e => setFirstName(e.target.value)}
        value={firstName}
      />

      <label>lastName:</label>
      <input
        type="text"
        onChange={e => setLastName(e.target.value)}
        value={lastName}
      />

      <label>Address:</label>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input"
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active ? "suggestion-item--active" : "suggestion-item"
                // inline style for demonstration purpose
                const style = suggestion.active ? { backgroundColor: "#fafafa", cursor: "pointer", color: "black" } : { backgroundColor: "#ffffff", cursor: "pointer", color: "black" }
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      {/* <label>Address:</label>
      <input
        type="text"
        onChange={e => setAddress(e.target.value)}
        value={address}
      /> */}

      <label>Phone Number:</label>
      <input
        type="number"
        onChange={e => setPhoneNumber(e.target.value)}
        value={phoneNumber}
      />

      {/* If the isloading is true, the button is disabled */}
      <button disabled={isLoading}>Sign up</button>

      {/* If error is true, it returns a div, with the error message */}
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup
