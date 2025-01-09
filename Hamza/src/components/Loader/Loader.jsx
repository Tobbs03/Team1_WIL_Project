import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.dotSpinner}>
        <div className={styles.dotSpinner_dot}></div>
        <div className={styles.dotSpinner_dot}></div>
        <div className={styles.dotSpinner_dot}></div>
        <div className={styles.dotSpinner_dot}></div>
        <div className={styles.dotSpinner_dot}></div>
        <div className={styles.dotSpinner_dot}></div>
        <div className={styles.dotSpinner_dot}></div>
        <div className={styles.dotSpinner_dot}></div>
      </div>
    </div>
  );
};

export default Loader;
