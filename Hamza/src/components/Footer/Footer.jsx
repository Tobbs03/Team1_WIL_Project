import React, { useContext } from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";

const Footer = () => {
  const authCtx = useContext(AuthContext);
  const handleClick = () => {
    authCtx.headerSetter(true);
  };

  return (
    <footer className={styles.footerDistributed}>
      <div className={styles.footerLeft}>
        <h3>
          Social <span>Awareness</span>
        </h3>
        <p className={styles.footerLinks}>
          <Link
            to={"/home"}
            className={`${styles.link} ${styles.link1}`}
            onClick={() => {
              handleClick();
            }}
          >
            <span> Home</span>
          </Link>

          <span>
            <Link
              to={"/vision"}
              className={styles.link}
              onClick={() => {
                handleClick();
              }}
            >
              <span>Vision</span>
            </Link>
          </span>
          <Link
            to={"/advertisement"}
            className={styles.link}
            onClick={() => {
              handleClick();
            }}
          >
            <span>Advertisement</span>
          </Link>
          <Link
            to={"/causes"}
            className={styles.link}
            onClick={() => {
              handleClick();
            }}
          >
            <span> Causes</span>
          </Link>
          <Link
            to={"/contact-us"}
            className={styles.link}
            onClick={() => {
              handleClick();
            }}
          >
            <span> Contact</span>
          </Link>
          {!authCtx.isLoggedIn ? (
            <Link
              to={"/sign-in"}
              className={styles.link}
              onClick={() => {
                handleClick();
              }}
            >
              <span>Sign-in</span>
            </Link>
          ) : (
            ""
          )}
        </p>
        <p className={styles.footerCompanyName}>Company Name © 2015</p>
      </div>

      <div className={styles.footerCenter}>
        <div>
          <i className="fas fa-map-marker"></i>
          <p>
            <span>444 S. Cedros Ave</span> Solana Beach, California
          </p>
        </div>

        <div>
          <i className="fas fa-phone"></i>
          <p>+1.555.555.5555</p>
        </div>

        <div className={styles.componymail}>
          <i className="fas fa-envelope"></i>
          <p>
            <a href="mailto:support@company.com">support@company.com</a>
          </p>
        </div>
      </div>

      <div className={styles.footerRight}>
        <p className={styles.footerCompanyAbout}>
          <span>About the company</span>
          Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
          euismod convallis velit, eu auctor lacus vehicula sit amet.
        </p>

        <div className={styles.footericons}>
          <a href="https://www.facebook.com" target="_Blank">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.twitter.com" target="_Blank">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.linkedin.com" target="_Blank">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://www.github.com" target="_Blank">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
