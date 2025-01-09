import React, { useContext } from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import { FaInstagramSquare } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io5";
import { BiFoodMenu } from "react-icons/bi";

const Footer = () => {
  const authCtx = useContext(AuthContext);
  const handleClick = () => {
    authCtx.headerSetter(true);
  };

  return (
    <footer className={styles.footerDistributed}>
      <div>
        <span className={styles.icon}>
          <BiFoodMenu />
        </span>
      </div>
      <div>
        <div className={styles.socialIcons}>
          <span className={styles.icon}>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsTwitterX />
            </a>
          </span>
          <span className={styles.icon}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagramSquare />
            </a>
          </span>
          <span className={styles.icon}>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoLogoYoutube />
            </a>
          </span>
          <span className={styles.icon}>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoLogoLinkedin />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
