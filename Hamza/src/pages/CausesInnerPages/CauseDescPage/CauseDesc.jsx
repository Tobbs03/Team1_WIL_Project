import React, { useContext, useEffect, useState } from "react";
import styles from "./CauseDesc.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import DummyImg from "../../../assets/walking-dude.jpg";
import DonateModal from "../../../components/CustomModals/DonateModal/DonateModal";
import Loader from "../../../components/Loader/Loader";
import { AuthContext } from "../../../store/auth-context";
import { CreateDonationAPI } from "../../../utils/http";
const CauseDesc = () => {
  const authCtx = useContext(AuthContext);
  const userData = JSON.parse(authCtx.userToken);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openDonateModal, setOpenDonateModal] = useState(false);

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location.state]);

  const onDonateSubmit = async (amount) => {
    //     amount: "",
    // userId: "",
    // causeId: "",

    if (!userData) {
      alert("Please Sign In to Donate!");
      return;
    }

    setLoading(true);

    // console.log("User Data: ", userData);
    // console.log("id: ", userData.user._id);

    const data = {
      amount: amount,
      userId: userData.user._id,
      causeId: location.state._id,
    };

    try {
      const response = await CreateDonationAPI(data, userData?.token);
      if (response.success) {
        alert("Donoation created sucessfully");
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("Error creating Donation:", error.message);
    }

    // console.log("Amount: ", amount);
    // console.log("causeId: ", location.state._id);

    // console.log("uSERdATA: ", userData.user._id);

    // console.log("State: ", location.state);

    setLoading(false);
  };

  return (
    <div>
      <div>
        <div className={styles.headerContainer}>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          <h1>Cause Description</h1>
        </div>

        <div className={styles.mainContainer}>
          <div className={styles.contentContainer}>
            <h3 className={styles.subheader}>
              Another subheading—maybe it’s related to the image on the left, or
              the button below
            </h3>

            <div className={styles.mainInnerContainer}>
              <h2>{location.state?.title}</h2>
              <p>{location.state?.description}</p>
            </div>

            <div className={styles.buttonContainer}>
              <button
                onClick={() => {
                  setOpenDonateModal(true);
                }}
              >
                <i className="fa-solid fa-circle-dollar-to-slot"></i>
                <span>Donate Now</span>
              </button>
              <button>
                <i className="fa-regular fa-comment"></i>
                <span>Comment</span>
              </button>
            </div>
          </div>
          <div className={styles.imgContainer}>
            <img src={DummyImg} alt={"Dummy"} />
          </div>
        </div>
      </div>

      {openDonateModal && (
        <DonateModal
          handleClose={() => {
            setOpenDonateModal(false);
          }}
          onSubmit={(val) => {
            onDonateSubmit(val);
            setOpenDonateModal(false);
          }}
        />
      )}

      {loading && <Loader />}
    </div>
  );
};

export default CauseDesc;
