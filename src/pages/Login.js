// Hooks
import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

// Login page
const Login = () => {
  // Setting the states
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Acessing the functions from the useLogin hook
  const { login, error, isLoading } = useLogin()

  // Function that handles the submit
  const handleSubmit = async e => {
    // Prevents the page from refreshing
    e.preventDefault()

    // Using the login function from the useLogin hook, with the email and password
    await login(email, password)
  }

  // JSX for the login page
  return (
    <div className="LoginPage">
      <form
        className="login"
        onSubmit={handleSubmit}
      >
        <h3>Login</h3>

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

        {/* If the isloading is true, the button is disabled */}
        <button disabled={isLoading}>Login</button>

        {/* If error is true, it returns a div, with the error message */}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default Login
