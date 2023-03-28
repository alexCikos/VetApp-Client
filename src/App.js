// Dependencies
import { createContext, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"
import catImage from "./images/cats-header.jpg"
import dogImage from "./images/dogs-header.jpg"

// Styles
import "./App.css"

// pages & Components
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import NavBar from "./components/Navbar"
import PetProfile from "./pages/PetProfile"
import PlayDates from "./pages/PlayDates"
import HomePage from "./pages/HomePage"
import PeoplePage from "./pages/PeoplePage"
import ServicePage from "./pages/Services"
import ContactPage from "./pages/Contact"
import ImageDisplay from "./components/ImageDisplay"

export const ThemeContext = createContext(null)

function App() {
  // Acessing the user state
  const { user } = useAuthContext()
  const [theme, setTheme] = useState("dark")
  const [currentImage, setCurrentImage] = useState(catImage)

  const handleButtonClick = image => {
    setCurrentImage(image)
  }

  const toggleTheme = () => {
    setTheme(curr => (curr === "light" ? "dark" : "light"))
  }

  // JSX for the main app
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className="App"
        id={theme}
      >
        {/* Browser route sets up the links and navigation to components */}
        <BrowserRouter>
          <NavBar
            onButtonClick={handleButtonClick}
            currentImage={currentImage}
          />
          <div className="mainImage">
            <ImageDisplay image={currentImage} />
          </div>

          <div className="pages">
            {/* Setting up the route to the home page, if user has a value, it goes to the home page
          if user has no value, it naviages to the login page */}
            <Routes>
              <Route
                path="/"
                element={<HomePage />}
              />
              <Route
                path="/team"
                element={<PeoplePage />}
              />
              <Route
                path="/services"
                element={<ServicePage />}
              />
              <Route
                path="/contact"
                element={<ContactPage />}
              />
              <Route
                path="/pets"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
              <Route
                path="/petProfile/:id"
                element={user ? <PetProfile /> : <Navigate to="/login" />}
              />
              <Route
                path="/playDates"
                element={user ? <PlayDates className="PlayDatesPage" /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
