import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <style>{`
        .footer {
          background: #111111;
          color: #ffffff;
          margin-top: 60px;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 55px 30px 25px;
        }

        .footer-main {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 50px;
          padding-bottom: 45px;
        }

        /* Brand */
        .footer-brand h2 {
          margin: 0 0 15px;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .footer-brand h2 span {
          color: #ffffff;
        }

        .footer-brand p {
          color: #aaaaaa;
          line-height: 1.7;
          font-size: 14px;
          max-width: 320px;
          margin: 0 0 20px;
        }

        /* Social Icons */
        .footer-social {
          display: flex;
          gap: 10px;
        }

        .footer-social a {
          width: 36px;
          height: 36px;
          border: 1px solid #444444;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          text-decoration: none;
          font-size: 14px;
          transition: 0.3s ease;
        }

        .footer-social a:hover {
          background: #ffffff;
          color: #111111;
          border-color: #ffffff;
        }

        /* Footer Columns */
        .footer-column h3 {
          font-size: 16px;
          margin: 0 0 20px;
          font-weight: 600;
        }

        .footer-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-column ul li {
          margin-bottom: 12px;
        }

        .footer-column ul li a {
          color: #aaaaaa;
          text-decoration: none;
          font-size: 14px;
          transition: 0.3s ease;
        }

        .footer-column ul li a:hover {
          color: #ffffff;
          padding-left: 3px;
        }

        /* Contact */
        .footer-contact p {
          color: #aaaaaa;
          font-size: 14px;
          margin: 0 0 12px;
          line-height: 1.6;
        }

        .footer-contact strong {
          color: #ffffff;
        }

        /* Newsletter */
        .newsletter {
          margin-top: 20px;
        }

        .newsletter h4 {
          font-size: 14px;
          margin: 0 0 10px;
        }

        .newsletter-form {
          display: flex;
          max-width: 300px;
        }

        .newsletter-form input {
          width: 100%;
          padding: 11px 12px;
          border: 1px solid #444444;
          background: #1c1c1c;
          color: #ffffff;
          outline: none;
          border-radius: 5px 0 0 5px;
          font-size: 13px;
        }

        .newsletter-form input::placeholder {
          color: #777777;
        }

        .newsletter-form button {
          border: none;
          background: #ffffff;
          color: #111111;
          padding: 0 16px;
          border-radius: 0 5px 5px 0;
          cursor: pointer;
          font-weight: 600;
          transition: 0.3s ease;
        }

        .newsletter-form button:hover {
          background: #dddddd;
        }

        /* Bottom Footer */
        .footer-bottom {
          border-top: 1px solid #2c2c2c;
          padding-top: 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .footer-bottom p {
          margin: 0;
          color: #777777;
          font-size: 13px;
        }

        .footer-bottom-links {
          display: flex;
          gap: 20px;
        }

        .footer-bottom-links a {
          color: #777777;
          text-decoration: none;
          font-size: 13px;
          transition: 0.3s ease;
        }

        .footer-bottom-links a:hover {
          color: #ffffff;
        }

        /* Tablet */
        @media (max-width: 900px) {
          .footer-main {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .footer-container {
            padding: 40px 20px 20px;
          }

          .footer-main {
            grid-template-columns: 1fr;
            gap: 35px;
          }

          .footer-brand p {
            max-width: 100%;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }

          .footer-bottom-links {
            justify-content: center;
            flex-wrap: wrap;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-container">

          <div className="footer-main">

            {/* Brand */}
            <div className="footer-brand">
              <h2>ShopNest</h2>

              <p>
                Your trusted destination for quality products at great prices.
                Shop smarter, discover more, and enjoy a seamless shopping
                experience with ShopNest.
              </p>

              <div className="footer-social">
                <a href="#" aria-label="Facebook">f</a>
                <a href="#" aria-label="Instagram">ig</a>
                <a href="#" aria-label="Twitter">X</a>
                <a href="#" aria-label="LinkedIn">in</a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-column">
              <h3>Quick Links</h3>

              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/shop">Shop</Link>
                </li>
                <li>
                  <Link to="/cart">Cart</Link>
                </li>
                <li>
                  <Link to="/profile">My Account</Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-column">
              <h3>Customer Service</h3>

              <ul>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms">Terms & Conditions</Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-column footer-contact">
              <h3>Get In Touch</h3>

              <p>
                <strong>Email:</strong><br />
                support@shopnest.com
              </p>

              <p>
                <strong>Phone:</strong><br />
                +92 300 1234567
              </p>

              <div className="newsletter">
                <h4>Subscribe to our newsletter</h4>

                <div className="newsletter-form">
                  <input
                    type="email"
                    placeholder="Your email"
                  />

                  <button type="button">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom */}
          <div className="footer-bottom">
            <p>
              © 2026 ShopNest. All rights reserved.
            </p>

            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/contact">Support</Link>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;