import React from "react";
import styles from "./Vision.module.css";
import WalkingGuyImg from "../../assets/walking-dude.jpg";

const Vision = () => {
  return (
    <div className={styles.maincontainer}>
      <div className={styles.Containerheapara}>
        <h1>Vision</h1>
        <p className={styles.subHeader}>
          Subheading for description or instructions
        </p>
      </div>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <p>
              Body text for your whole article or post. We’ll put in some lorem
              ipsum to show how a filled-out page might look
            </p>
            <br />
            <p>
              Excepteur efficient emerging, minim veniam anim aute carefully
              curated Ginza conversation exquisite perfect nostrud nisi
              intricate Content. Qui international first-class nulla ut.
              Punctual adipisicing, essential lovely queen tempor eiusmod irure.
              Exclusive izakaya charming Scandinavian impeccable aute quality of
              life soft power pariatur Melbourne occaecat discerning. Qui
              wardrobe aliquip, et Porter destination Toto remarkable officia
              Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur
            </p>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <img src={WalkingGuyImg} alt={"Walking Guy"} />
        </div>
      </div>
    </div>
  );
};

export default Vision;
