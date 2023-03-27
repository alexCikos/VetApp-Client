// Hooks and dependencies
import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import { useContext } from "react"
import ReactSwitch from "react-switch"
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import { useState } from "react"

import SearchBar from "./SearchBar"
import { ThemeContext } from "../App"
import { SidebarData, NLSidebarData } from "./NavBarData"

import "./Navbar.css"

// Nav bar component
const Navbar = () => {
  const { toggleTheme, theme } = useContext(ThemeContext)
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)
  // Acessing the logout function from the useLogout hook
  const { logout } = useLogout()

  // Acessing the users state from the useAuthContext
  const { user } = useAuthContext()

  // Handles what happens when handleClick is called
  const handleClick = () => {
    // Calls the logout function
    logout()
  }

  // JSX for the nav bar
  return (
    <header>
      <div className="container">
        {/* Link is part of React-router-dom, here it redirect the user to this
        route when the user clicks this element */}
        <Link to="/">
          <h1>Vet App</h1>
        </Link>

        {user && <SearchBar />}

        {user && <p>{user.email}</p>}

        <nav>
          <div className="switch">
            <label>{theme === "light" ? "Light Mode" : "Dark Mode"}</label>
            <ReactSwitch
              onChange={toggleTheme}
              checked={theme === "dark"}
              height={16}
              width={44}
              className="react-switch"
            />
          </div>
          {user && (
            <>
              <div className="burger-menu">
                <Link
                  to="#"
                  className="menu-bars"
                >
                  <FaIcons.FaBars onClick={showSidebar} />
                </Link>
              </div>

              <div className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul
                  className="nav-menu-items"
                  onClick={showSidebar}
                >
                  <li className="navbar-toggle">
                    <Link
                      to="#"
                      className="menu-bars"
                    >
                      <AiIcons.AiOutlineClose />
                    </Link>
                  </li>
                  {SidebarData.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className={item.cName}
                      >
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    )
                  })}
                  <li style={{ listStyle: "none", marginRight: "40px", paddingTop: "30px" }}>
                    <button onClick={handleClick}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
          )}

          {/* If the user has no value, it returns this element */}

          {!user && (
            <>
              <div className="burger-menu">
                <Link
                  to="#"
                  className="menu-bars"
                >
                  <FaIcons.FaBars onClick={showSidebar} />
                </Link>
              </div>

              <div className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul
                  className="nav-menu-items"
                  onClick={showSidebar}
                >
                  <li className="navbar-toggle">
                    <Link
                      to="#"
                      className="menu-bars"
                    >
                      <AiIcons.AiOutlineClose />
                    </Link>
                  </li>
                  {NLSidebarData.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className={item.cName}
                      >
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </>
          )}

          {/* {!user && (
            <div className="links">
              <Link to="/login">
                <span>Login</span>
              </Link>
              <Link to="/signup">
                <span>Sign Up</span>
              </Link>
            </div>
          )} */}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
