import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import { UserRegisterAPI } from "../../../utils/http";
const SignUp = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const [inputs, setinputs] = useState({
    name: {
      value: "",
      isValid: true,
    },
    email: {
      value: "",
      isValid: true,
    },
    password: {
      value: "",
      isValid: true,
    },
    username: {
      value: "",
      isValid: true,
    },
  });

  function InputChangeHandler(inputIdentifier, enteredValue) {
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

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const isNameValid = inputs.name.value.trim().length > 0;
    const isEmailValid = inputs.email.value.trim().length > 0;
    const isPasswordValid = inputs.password.value.trim().length >= 6;
    const isUserNameValid = inputs.username.value.trim().length > 0;

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isUserNameValid) {
      setinputs((curInputs) => {
        return {
          name: {
            value: curInputs.name.value,
            isValid: isNameValid,
          },
          email: {
            value: curInputs.email.value,
            isValid: isEmailValid,
          },
          password: {
            value: curInputs.password.value,
            isValid: isPasswordValid,
          },
          username: {
            value: curInputs.username.value,
            isValid: isUserNameValid,
          },
        };
      });
      return;
    }

    setLoading(true);

    const data = {
      name: inputs.name.value,
      email: inputs.email.value,
      password: inputs.password.value,
      username: inputs.username.value,
    };

    const sendRes = await UserRegisterAPI(data);
    if (sendRes.success) {
      alert(`Success: ${sendRes.message}`);
      navigate("/sign-in");
    } else {
      alert(`Error: ${sendRes.message}`);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.heading}>
          <span>Registration Page</span>
        </div>
        <form onSubmit={HandleSubmit} className={styles.formComponent}>
          <div className={styles.inputContainer}>
            <label htmlFor="user-og-name">Name</label>
            <div
              className={`${styles.inputWrapper} ${
                !inputs.name.isValid ? styles.inputError : null
              }`}
            >
              <input
                type="text"
                id="user-og-name"
                name="name"
                required
                className={styles.inputControl}
                placeholder="value"
                value={inputs.name.value}
                onChange={(e) => {
                  InputChangeHandler("name", e.target.value);
                }}
              />
            </div>
            {!inputs.name.isValid && (
              <span className={styles.errorText}>Please Enter your Name</span>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="user-og-email">Email</label>
            <div
              className={`${styles.inputWrapper} ${
                !inputs.email.isValid ? styles.inputError : null
              }`}
            >
              <input
                type="email"
                id="user-og-email"
                name="email"
                required
                className={styles.inputControl}
                placeholder="value"
                value={inputs.email.value}
                onChange={(e) => {
                  InputChangeHandler("email", e.target.value);
                }}
              />
            </div>
            {!inputs.email.isValid && (
              <span className={styles.errorText}>Please Enter your Email</span>
            )}
          </div>

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
                placeholder="value"
                value={inputs.username.value}
                onChange={(e) => {
                  InputChangeHandler("username", e.target.value);
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
                name="password"
                required
                className={styles.inputControl}
                placeholder="value"
                value={inputs.password.value}
                onChange={(e) => {
                  InputChangeHandler("password", e.target.value);
                }}
              />

              <button
                type="button"
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
                Please Enter Password (at least 6 characters)
              </span>
            )}
          </div>

          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </form>
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default SignUp;
