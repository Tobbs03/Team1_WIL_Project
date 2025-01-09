import React, { useState, useEffect, useContext } from "react";
import "./Donation.css";
import { Table, Alert } from "react-bootstrap";
import { GetDonationAPI } from "../../utils/http";
import { AuthContext } from "../../store/auth-context";
function Donation() {
  const authCtx = useContext(AuthContext);
  const userData = JSON.parse(authCtx.userToken);
  const [donation, setdonation] = useState([]);

  const FetchDontaion = async () => {
    const getRes = await GetDonationAPI(userData?.user?._id, userData?.token);
    if (getRes.success) {
      setdonation(getRes.data);
    }
    console.log("GetRes: ", getRes);
  };

  useEffect(() => {
    FetchDontaion();
    // console.log("User Data: ", userData);
  }, [userData?.userToken]);
  return (
    <div className="p-4 custom-bg Height">
      <div>
        <h1 className=" Hsize ">Donation</h1>
        <p className="subHeader">Subheading</p>
      </div>
      {!donation.length ? (
        <Alert variant="warning">No Donation Found</Alert>
      ) : (
        <div className="mt-5">
          <Table bordered>
            <thead className="text-center">
              <tr>
                <th>No.</th>
                {/* <th>UserId</th> */}
                <th>User</th>
                {/* <th>CauseId</th> */}
                <th>Title</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {donation.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  {/* <td>{item.userId._id}</td> */}
                  <td>{item.userId.username}</td>
                  {/* <td>{item.causeId._id}</td> */}
                  <td>{item.causeId.title}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default Donation;
