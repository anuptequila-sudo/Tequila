"use client";
import "@/styles/ContactSection.css";
import Button from "../ui/Button";

export default function ContactSection() {
  return (
    <section className="contact-section">
      <div className="contact-header">
        <h2 className="contact-header-title">Say Hello</h2>
      </div>

      <div className="contact-container">
        <div className="contact-item-first">
          <p className="contact-header-description">
            <span className="description-highlight-space"></span>
            Got a brand to build or a bold idea brewing? Let's make it real.
            Whether you're ready to dive in or just testing the waters - we're
            always up for a smart conversation. Drop us a line, and let's see
            where it takes us.
          </p>
        </div>
        <div className="contact-item-second">
          <span className="contact-form">
            Hey Tequila, I'm{"  "}
            <div className="contact-name">
              <input
                type="text"
                className="form-control"
                placeholder="Your Name*"
              />
            </div>{".  "}
            You can reach me at{"  "}
            <div className="contact-name">
              <input
                type="text"
                className="form-control"
                placeholder="Your Email*"
              />
            </div> {".  "}
            or call me on{"  "}
            <div className="contact-name">
              <input
                type="text"
                className="form-control"
                placeholder="Your Phone Number*"
              />
            </div> {".  "}
            Here's what I've been thinking about: <br/>
            
          </span>
          <div className="contact-name contact-message">
              {"  "}
              <textarea
                className="form-control"
                placeholder="Your Message"
              ></textarea>{" "}
            </div>
            <div className="contact-button-container">
                <div className="contact-button">
                    <Button variant="primary">HIT SEND</Button>
                </div>
            </div>
        </div>
        
      </div>
    </section>
  );
}
