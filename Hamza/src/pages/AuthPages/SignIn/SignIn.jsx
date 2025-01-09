import React, { useContext, useState } from "react";
import styles from "../SignUp/SignUp.module.css";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import { UserLoginAPI } from "../../../utils/http";
import { AuthContext } from "../../../store/auth-context";

import { Link } from "react-router-dom";
const SignIn = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setinputs] = useState({
    username: {
      value: "",
      isValid: true,
    },
    password: {
      value: "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setinputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: {
          value:
            inputIdentifier == "username"
              ? enteredValue.replace(/\s/g, "")
              : enteredValue,
          isValid: true,
        },
      };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isUserNameValid = inputs.username.value.trim().length > 0;
    const isPasswordValid = inputs.password.value.trim().length >= 6;

    if (!isPasswordValid || !isUserNameValid) {
      setinputs((curInputs) => {
        return {
          username: {
            value: curInputs.username.value,
            isValid: isUserNameValid,
          },
          password: {
            value: curInputs.password.value,
            isValid: isPasswordValid,
          },
        };
      });
      return;
    }

    setLoading(true);

    const data = {
      username: inputs.username.value,
      password: inputs.password.value,
    };

    const sendRes = await UserLoginAPI(data);
    // console.log(sendRes);
    if (sendRes.success) {
      alert(`Success: ${sendRes.message}`);
      if (sendRes.data.user.role === "user") {
        authCtx.userAuthenticate(sendRes.data);
        authCtx.login();
        navigate("/");
      } else if (sendRes.data.user.role === "admin") {
        authCtx.adminAuthenticate(sendRes.data);
        navigate("/admin");
      }
    } else {
      alert(`Error: ${sendRes.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="singin-up-h">
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.formComponent}>
          <p>Sign In</p>

          <div className={styles.inputContainer}>
            <label htmlFor="user-og-username">Username</label>
            <div
              className={`${styles.inputWrapper} ${
                !inputs.username.isValid ? styles.inputError : null
              }`}
            >
              <input
                type="text"
                id="user-og-username"
                name="username"
                required
                className={styles.inputControl}
                placeholder="ex: jonDoe"
                value={inputs.username.value}
                onChange={(e) => {
                  inputChangeHandler("username", e.target.value);
                }}
              />
            </div>
            {!inputs.username.isValid && (
              <span className={styles.errorText}>
                Please Enter your Username
              </span>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="user-og-password">Password</label>
            <div
              className={`${styles.inputWrapper} ${
                !inputs.password.isValid ? styles.inputError : null
              }`}
            >
              <input
                type={!showPass ? "password" : "text"}
                id="user-og-password"
                name="email"
                required
                className={styles.inputControl}
                placeholder=""
                value={inputs.password.value}
                onChange={(e) => {
                  inputChangeHandler("password", e.target.value);
                }}
              />

              <button
                type="reset"
                className={styles.passwordButton}
                onClick={(e) => {
                  e.preventDefault();
                  setShowPass(!showPass);
                }}
              >
                {showPass ? (
                  <i className="fa-regular fa-eye-slash"></i>
                ) : (
                  <i className="fa-regular fa-eye"></i>
                )}
              </button>
            </div>
            {!inputs.password.isValid && (
              <span className={styles.errorText}>
                Please Enter Password (atleast 6 chars)
              </span>
            )}
          </div>

          <button type="submit" id="begin" className={styles.submitBtn}>
            Submit
          </button>

          <div className={styles.alreadyAccountBox}>
            <span>Don't have an Account?</span>
            <Link to={"/sign-up"}>Sign Up</Link>
          </div>
        </form>
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default SignIn;
