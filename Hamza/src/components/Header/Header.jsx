import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";
// import { AuthContext } from "../../store/auth-context";
// import Dummy from "../../assets/walking-dude.jpg";
import User from "../../assets/user.jpg";
import { BaseUrl, GetUserAPI } from "../../utils/http";
const Header = (props) => {
  const { userData, isLoggedIn, authCtx } = props;
  const location = useLocation();
  const [img, setimg] = useState("");
  // // const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const FetchUserDetails = async () => {
      const getRes = await GetUserAPI(userData?.token);
      if (getRes.success) {
        const UserDetails = getRes.data;
        setimg(UserDetails.image);
        // console.log("image", UserDetails.image);
      }
    };
    if (userData?.token) {
      // console.log("123");
      FetchUserDetails();
    }
  }, [userData?.token, authCtx.isUpdatedProfile]);

  return (
    <nav>
      <input type="checkbox" id={styles.check} />
      <label htmlFor="check" className={styles.checkbtn}>
        <i className="fas fa-bars"></i>
      </label>
      <label className={styles.logo}>Social Awareness</label>
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
            className={location.pathname === "/vision" ? styles.active : null}
            to={"/vision"}
          >
            Vision
          </Link>
        </li>

        <li>
          <Link
            className={location.pathname === "/Donation" ? styles.active : null}
            to={"/Donation"}
          >
            Donation
          </Link>
        </li>
        <li>
          <Link
            className={
              location.pathname === "/advertisement" ? styles.active : null
            }
            to={"/advertisement"}
          >
            Advertisement
          </Link>
        </li>
        <li>
          <Link
            className={
              location.pathname.includes("/causes") ? styles.active : null
            }
            to={"/causes"}
          >
            Causes
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

        {!!userData ? (
          <li>
            <Link
              className={`${
                location.pathname === "/profile" ? styles.active : null
              }${isLoggedIn ? styles.LogoImg : ""} `}
              to={"/profile"}
            >
              {/* <i className="fa-solid fa-user"></i> */}
              {img ? (
                <img src={BaseUrl + "/" + img} alt="" />
              ) : (
                <img src={User} alt="" />
              )}
              {/* {isLoggedIn ? (
                <img src="" alt="" />
              ) : (
                <i className="fa-solid fa-user"></i>
              )} */}
              {/* <i className="fa-solid fa-user"></i> */}
              {/* <img src={} alt="" /> */}
            </Link>
          </li>
        ) : (
          <li className={styles.navulli}>
            <Link
              className={`${styles.registerButton} ${
                location.pathname === "/sign-up" ||
                location.pathname === "/sign-in"
                  ? styles.active
                  : null
              } ${styles.navullia}`}
              to={"/sign-in"}
            >
              Sign In
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
