import React, { useContext, useState } from "react";
import styles from "./DonateModal.module.css";
import { AuthContext } from "../../../store/auth-context";

const DonateModal = (props) => {
  const { handleClose, onSubmit } = props;
  const { isLoggedIn } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    amount: {
      value: "",
      isValid: true,
    },
  });

  function inputChangeHandler(enteredValue) {
    setInputs({
      amount: {
        value: enteredValue,
        isValid: true,
      },
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Please login to make a donation.");
      return;
    }

    // console.log("Inputs: ", inputs);

    const isAmountValid = inputs.amount.value.trim().length > 0;
    if (!isAmountValid) {
      const amount = inputs.amount.value;
      setInputs({
        amount: {
          value: amount,
          isValid: isAmountValid,
        },
      });
      return;
    }

    onSubmit(inputs.amount.value);
  };

  return (
    <div>
      <div
        className={styles.darkBG}
        onClick={() => {
          handleClose();
        }}
      />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Donate Money</h5>
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => {
              handleClose();
            }}
          >
            <i
              className="fa-regular fa-circle-xmark"
              style={{ marginBottom: "-3px" }}
            ></i>
          </button>

          <form onSubmit={handleSubmit} className={styles.formComponent}>
            <div className={styles.inputContainer}>
              <label htmlFor="donate-amount">Amount</label>
              <div
                className={`${styles.inputWrapper} ${
                  !inputs.amount.isValid ? styles.inputError : null
                }`}
              >
                <div className={styles.amountIconContainer}>
                  <i className="fa-solid fa-indian-rupee-sign"></i>
                </div>
                <input
                  type={"text"}
                  id="donate-amount"
                  name="amount"
                  required
                  className={styles.inputControl}
                  placeholder="ex: 1000"
                  value={inputs.amount.value}
                  onChange={(e) => {
                    if (/^-?\d*\.?\d*$/.test(e.target.value)) {
                      inputChangeHandler(e.target.value);
                    }
                  }}
                />
              </div>
              {!inputs.amount.isValid && (
                <span className={styles.errorText}>
                  Please Enter Donation Amount
                </span>
              )}
            </div>

            <div className={styles.modalActions}>
              <div className={styles.actionsContainer}>
                <button type="submit" className={styles.submitBtn}>
                  Make Donation
                </button>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonateModal;
