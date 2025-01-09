import React from "react";
import styles from "./CauseCard.module.css";
import DummyImg from "../../../assets/walking-dude.jpg";
import { BaseUrl } from "../../../utils/http";

const CauseCard = (props) => {
  //   console.log("items", props);
  //   console.log("img", props.item.image);
  const { item, onClickCard } = props;

  return (
    <div
      className={styles.causeCard}
      onClick={() => {
        onClickCard();
      }}
    >
      <div className={styles.cardImageContainer}>
        <img
          src={BaseUrl + "/" + item.image}
          className={styles.imgClass}
          alt="Dummy"
        />
      </div>
      <p className={styles.cardTitle}>{item.title}</p>
      <p className={styles.cardDes}>
        {item.description.slice(0, 250)}{" "}
        {item.description.length > 250 ? "..." : ""}
      </p>
    </div>
  );
};

export default CauseCard;
