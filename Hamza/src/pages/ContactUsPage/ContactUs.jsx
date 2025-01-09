import React, { useContext, useEffect, useState } from "react";
import styles from "./ContactUs.module.css";
import Loader from "../../components/Loader/Loader";
import ContactImg from "../../assets/contact-us.jpg";
import { AuthContext } from "../../store/auth-context";
import { CreateContactAPI } from "../../utils/http";

const ContactUs = () => {
  const authCtx = useContext(AuthContext);
  const userData = JSON.parse(authCtx.userToken);
  const [loading, setLoading] = useState(false);
  const initialinputs = {
    firstName: {
      value: "",
      isValid: true,
    },
    lastName: {
      value: "",
      isValid: true,
    },
    email: {
      value: "",
      isValid: true,
    },
    message: {
      value: "",
      isValid: true,
    },
  };
  const [inputs, setInputs] = useState(initialinputs);

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: {
          value: enteredValue,
          isValid: !!enteredValue,
        },
      };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData) {
      alert("Please Login to Submit");
      return;
    }

    const isUserFirstNameValid = inputs.firstName.value.trim().length > 0;
    const isUserLastNameValid = inputs.lastName.value.trim().length > 0;
    const isEmailValid = inputs.email.value.trim().length > 0;
    const isMassageValid = inputs.message.value.trim().length > 5;
    if (
      !isUserLastNameValid ||
      !isUserFirstNameValid ||
      !isMassageValid ||
      !isEmailValid
    ) {
      setInputs((curInputs) => {
        return {
          firstName: {
            value: curInputs.firstName.value,
            isValid: isUserFirstNameValid,
          },
          lastName: {
            value: curInputs.lastName.value,
            isValid: isUserLastNameValid,
          },
          email: {
            value: curInputs.email.value,
            isValid: isEmailValid,
          },
          message: {
            value: curInputs.message.value,
            isValid: isMassageValid,
          },
        };
      });
      return;
    }
    setInputs(initialinputs);
    //

    setLoading(true);
    const data = {
      firstName: inputs.firstName.value,
      lastName: inputs.lastName.value,
      email: inputs.email.value,
      message: inputs.message.value,
    };

    const submitRes = await CreateContactAPI(data, userData.token);

    if (submitRes.success) {
      // console.log("submitRes", submitRes);
      alert("submit success");
    } else {
    }

    setLoading(false);
  };

  return (
    <div className="H">
      <div className={styles.contactContainer}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.headerContainer}>
            <h1 className="text-center">Contact Us</h1>
            <p className="text-center">
              Subheading for Description or Instructions
            </p>
          </div>

          <div className={styles.inputRow}>
            <div className={styles.inputContainer}>
              <label htmlFor="user-f-name">First Name*</label>
              <div
                className={`${styles.inputWrapper} ${
                  !inputs.firstName.isValid ? styles.inputError : null
                }`}
              >
                <input
                  type="text"
                  id="user-f-name"
                  name="firstName"
                  required
                  className={styles.inputControl}
                  placeholder="ex: Jon"
                  value={inputs.firstName.value}
                  onChange={(e) => {
                    inputChangeHandler("firstName", e.target.value);
                  }}
                />
              </div>
              {!inputs.firstName.isValid && (
                <span className={styles.errorText}>
                  Please Enter First Name
                </span>
              )}
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="user-l-name">Last Name*</label>
              <div
                className={`${styles.inputWrapper} ${
                  !inputs.lastName.isValid ? styles.inputError : null
                }`}
              >
                <input
                  type="text"
                  id="user-l-name"
                  name="lastName"
                  required
                  className={styles.inputControl}
                  placeholder="ex: Doe"
                  value={inputs.lastName.value}
                  onChange={(e) => {
                    inputChangeHandler("lastName", e.target.value);
                  }}
                />
              </div>
              {!inputs.lastName.isValid && (
                <span className={styles.errorText}>Please Enter Last Name</span>
              )}
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="user-email">Email*</label>
            <div
              className={`${styles.inputWrapper} ${
                !inputs.email.isValid ? styles.inputError : null
              }`}
            >
              <input
                type="email"
                id="user-email"
                name="email"
                required
                className={styles.inputControl}
                placeholder="ex: jon.doe@gmail.com"
                value={inputs.email.value}
                onChange={(e) => {
                  inputChangeHandler("email", e.target.value);
                }}
              />
            </div>
            {!inputs.email.isValid && (
              <span className={styles.errorText}>Please Enter Your Email</span>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="user-message">Message*</label>
            <div
              className={`${styles.inputWrapper} ${
                !inputs.message.isValid ? styles.inputError : null
              }`}
            >
              <textarea
                type="text"
                id="user-message"
                name="message"
                required
                rows={4}
                className={styles.inputControl}
                placeholder="message.."
                value={inputs.message.value}
                onChange={(e) => {
                  inputChangeHandler("message", e.target.value);
                }}
              />
            </div>
            {!inputs.message.isValid && (
              <span className={styles.errorText}>
                Please Enter Your Message
              </span>
            )}
          </div>

          <button type="submit" className="w-100">
            SUBMIT
          </button>
        </form>

        <div className={styles.imgContainer}>
          <img
            src={ContactImg}
            alt={"Contact Image"}
            className={styles.contactImg}
          />

          <div className={styles.contactInfoContainer}>
            <div className={styles.contactInfoRow}>
              <i class="fa-solid fa-phone"></i>
              <span>+91 - 1234567890</span>
            </div>
            <div className={styles.contactInfoRow}>
              <i class="fa-solid fa-envelope"></i>
              <span>jon.doe@gmail.com</span>
            </div>
            <div className={styles.contactInfoRow}>
              <i class="fa-solid fa-location-dot"></i>
              <span>abc address</span>
            </div>
          </div>
        </div>
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default ContactUs;
