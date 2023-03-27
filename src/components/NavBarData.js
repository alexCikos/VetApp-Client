import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import * as MdIcons from "react-icons/md"
import * as CgIcons from "react-icons/cg"
import * as RiIcons from "react-icons/ri"

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text"
  },
  {
    title: "Our Team",
    path: "/team",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text"
  },
  {
    title: "Your Pets",
    path: "/pets",
    icon: <MdIcons.MdPets />,
    cName: "nav-text"
  },
  {
    title: "PlayDates",
    path: "/playDates",
    icon: <CgIcons.CgCalendarDates />,
    cName: "nav-text"
  }
]

export const NLSidebarData = [
  {
    title: "Login In",
    path: "/login",
    icon: <RiIcons.RiLoginBoxFill />,
    cName: "nav-text"
  },
  {
    title: "Register",
    path: "/signup",
    icon: <AiIcons.AiOutlineLogin />,
    cName: "nav-text"
  },
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text"
  },
  {
    title: "Our Team",
    path: "/team",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text"
  }
]
