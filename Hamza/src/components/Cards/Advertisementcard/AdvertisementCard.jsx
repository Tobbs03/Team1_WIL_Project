import React from "react";
import styles from "./AdvertisementCard.css";
import Dummy from "../../../assets/walking-dude.jpg";
function Advertisementitem({ Name, Number, Description }) {
  return (
    // <div className={styles.CardAdv}>
    //   <div>
    //     <h3>Bussiness {Number} Adversitement</h3>
    //   </div>
    //   < className={styles.imagediv}>
    //     <div className={styles.imagecontainer}>
    //       <img src={imgsrc} />
    //     </div>
    //     <div className={styles.textdiv}>
    //       <h5 className={styles.heading}>Name {Name}</h5>
    //       <p className={styles.paragraph}>Description {Description}</p>
    //     </div
    // </div>
    <div className="col-md-5 bg-white rounded-4 pt-3 pb-3  px-5  my-5 mx-auto ">
      <div className="mb-3">
        <h3>Business Adversitement</h3>
      </div>
      <div className="d-flex align-items-center mt-3">
        <div className="d-inline-block">
          <img src={Dummy} />
        </div>
        <div className="d-inline-block" style={{ marginLeft: "15px" }}>
          <h5>title : {Name}</h5>
          <p className="d-flex align-items-center">
            Description: {Description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Advertisementitem;
