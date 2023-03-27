import { Link } from "react-router-dom"

const Table = ({ data, handleLinkClick }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Breed</th>
          <th>Age</th>
        </tr>
        {data.map(item => (
          <tr key={item._id}>
            <td>{item.name}</td>
            <td>{item.breed}</td>
            <td>{item.age}</td>
            <td>
              <Link
                to={`/petProfile/${item._id}`}
                onClick={handleLinkClick}
              >
                View Profile
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
