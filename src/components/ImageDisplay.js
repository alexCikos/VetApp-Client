import React from "react"

function ImageDisplay(props) {
  return (
    <img
      src={props.image}
      alt="Current animal"
    />
  )
}

export default ImageDisplay
