import Map from "../images/Map.JPG"

import "./Contact.css"

const Contact = () => {
  return (
    <div className=".contact-container">
      <div className="contact-banner">
        <h3>Contact Us</h3>
        <p>We are to provide you the best service possble, feel free to message us</p>
      </div>
      <section className="contact-main">
        <img
          src={Map}
          alt="map"
        />
        <form>
          <h4>Send a Message!</h4>
          <label>Name</label>
          <input type="text" />
          <label>Email</label>
          <input type="emai" />
          <label>Message</label>
          <textarea
            id="message"
            name="message"
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  )
}

export default Contact
