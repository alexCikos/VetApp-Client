import React from "react"

function ImageDisplay(props) {
  return (
    <img
      className="IMAGE"
      src={props.image}
      alt="Current animal"
    />
  )
}

export default ImageDisplay
