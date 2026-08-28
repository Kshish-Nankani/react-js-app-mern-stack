import React from "react";
import "../styles/contact.css";

const Contact = () => {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <p className="contact-eyebrow">Contact ShopNest</p>
        <h1>We Are Here To Help</h1>
        <p className="contact-lead">
          Questions about an order, product availability, or account support?
          Reach out and our team will respond as soon as possible.
        </p>
      </section>

      <section className="contact-layout">
        <article className="contact-card contact-info-card">
          <h2>Get In Touch</h2>
          <p>
            Choose any channel below and our support team will connect with you.
          </p>

          <div className="contact-info-list">
            <div className="contact-info-item">
              <h3>Email</h3>
              <p>support@shopnest.com</p>
            </div>

            <div className="contact-info-item">
              <h3>Phone</h3>
              <p>+92 300 1234567</p>
            </div>

            <div className="contact-info-item">
              <h3>Office Hours</h3>
              <p>Mon - Sat, 9:00 AM to 8:00 PM</p>
            </div>

            <div className="contact-info-item">
              <h3>Address</h3>
              <p>ShopNest HQ, Lahore, Pakistan</p>
            </div>
          </div>
        </article>

        <article className="contact-card contact-form-card">
          <h2>Send Us A Message</h2>

          <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
            <div className="contact-field-grid">
              <div className="contact-field">
                <label htmlFor="fullName">Full Name</label>
                <input id="fullName" type="text" placeholder="Your full name" />
              </div>

              <div className="contact-field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="you@example.com" />
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="subject">Subject</label>
              <input id="subject" type="text" placeholder="How can we help?" />
            </div>

            <div className="contact-field">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="6" placeholder="Write your message here..." />
            </div>

            <button type="submit" className="contact-submit-btn">
              Send Message
            </button>
          </form>
        </article>
      </section>
    </main>
  );
};

export default Contact;
