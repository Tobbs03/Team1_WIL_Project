import React, { useEffect, useState, useContext } from "react";
import styles from "./Causes.module.css";
import { useNavigate } from "react-router-dom";
import { GetCauseAPI } from "../../utils/http";
import CauseCard from "../../components/Cards/CauseCard/CauseCard";
import { AuthContext } from "../../store/auth-context";
const Causes = () => {
  const authCtx = useContext(AuthContext);
  const userData = JSON.parse(authCtx.userToken);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [causes, setCauses] = useState([]);

  const FethCauses = async () => {
    const getRes = await GetCauseAPI();
    // console.log("GetRes: ", getRes.data);
    if (getRes.success) {
      setCauses(getRes.data);
    }
  };
  useEffect(() => {
    FethCauses();
  }, [userData?.token]);
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div>
            <h1>Causes list</h1>
            <p>All available causes are listed below</p>
          </div>

          {isLoggedIn ? (
            <button
              className={styles.headerBtn}
              onClick={() => {
                navigate("/causes/create-cause");
              }}
            >
              Create Cause
            </button>
          ) : (
            ""
          )}
        </div>

        {causes?.length > 0 ? (
          <div className={styles.causeListContainer}>
            {causes.map((item) => {
              return (
                <CauseCard
                  key={item?._id}
                  item={item}
                  onClickCard={() => {
                    navigate("/causes/cause-description", { state: item });
                  }}
                />
              );
            })}
          </div>
        ) : (
          <div className={styles.noListBox}>
            <p>No Cause Available!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Causes;
