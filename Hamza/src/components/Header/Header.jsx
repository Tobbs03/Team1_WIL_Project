import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";
import { BaseUrl, GetUserAPI } from "../../utils/http";
import { BiFoodMenu } from "react-icons/bi";
const Header = (props) => {
  const { userData, isLoggedIn, authCtx } = props;
  const location = useLocation();
  const [img, setimg] = useState("");
  useEffect(() => {
    const FetchUserDetails = async () => {
      const getRes = await GetUserAPI(userData?.token);
      if (getRes.success) {
        const UserDetails = getRes.data;
        setimg(UserDetails.image);
      }
    };
    if (userData?.token) {
      // console.log("123");
      FetchUserDetails();
    }
  }, [userData?.token, authCtx.isUpdatedProfile]);

  return (
    <nav>
      <label className={styles.logo}>
        <BiFoodMenu />
      </label>
      <ul className="Navul">
        <li>
          <Link
            className={location.pathname === "/home" ? styles.active : null}
            to={"/home"}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={
              location.pathname === "/Campaigns" ? styles.active : null
            }
            to={"/Campaigns"}
          >
            Campaigns
          </Link>
        </li>

        <li>
          <Link
            className={
              location.pathname === "/BusinessPromotions" ? styles.active : null
            }
            to={"/BusinessPromotions"}
          >
            Promotions
          </Link>
        </li>
        <li>
          <Link
            className={location.pathname === "/Blogs" ? styles.active : null}
            to={"/Blogs"}
          >
            Blogs
          </Link>
        </li>

        <li>
          <Link
            className={
              location.pathname === "/contact-us" ? styles.active : null
            }
            to={"/contact-us"}
          >
            Contact
          </Link>
        </li>

        <li className={styles.navulli}>
          <Link
            className={`${styles.registerButton} ${
              location.pathname === "/sign-in" ? styles.activebtn : null
            } ${styles.navullia}`}
            to={"/sign-in"}
          >
            Sign In
          </Link>
        </li>

        <li className={styles.navulli}>
          <Link
            className={`${styles.registerButton} ${
              location.pathname === "/sign-up" ? styles.activebtn : null
            } ${styles.navullia}`}
            to={"/sign-up"}
          >
            Sign up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
