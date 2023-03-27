import Table from "./Table"
import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

function SearchBar() {
  const [query, setQuery] = useState("")
  const [data, setData] = useState([])
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://VetApp117-api.com?q=${query}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      const jsonData = await res.json()
      setData(jsonData)
    }
    if (query.length > 2) {
      fetchData()
    } else {
      setData([])
    }
  }, [query, user.token])

  const handleLinkClick = () => {
    setQuery("") // add this line to clear the query
  }

  return (
    <div className="app">
      <input
        className="search"
        placeholder="Search for pet :)..."
        onChange={e => setQuery(e.target.value.toLowerCase())}
      />
      {data.length > 0 && (
        <Table
          data={data}
          handleLinkClick={handleLinkClick}
        />
      )}
    </div>
  )
}

export default SearchBar
