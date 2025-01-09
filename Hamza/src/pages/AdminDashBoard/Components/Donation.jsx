import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Alert } from "react-bootstrap";
import { AuthContext } from "../../../store/auth-context";
import { GetDonationAPI } from "../../../utils/http";
import Loader from "../../../components/Loader/Loader";
function Donation() {
  const [donation, setDonation] = useState([]);
  const authCtx = useContext(AuthContext);
  const adminData = JSON.parse(authCtx.adminToken);
  console.log("Admin :", adminData);
  const [loading, setloading] = useState(false);
  const FetchDonation = async () => {
    setloading(true);
    try {
      const response = await GetDonationAPI(null, adminData?.token);
      // console.log("Response: ", response);
      if (response?.success) {
        // console.log(JSON.stringify(response?.data));
        setDonation(response?.data);
      }
    } catch (error) {
      console.error("Error fetching donation:", error.message);
    }
    setloading(false);
  };
  useEffect(() => {
    // console.log(123);
    FetchDonation();
  }, [adminData?.adminToken]);
  return (
    <Container>
      {!donation.length ? (
        <Alert variant="warning" style={{ zIndex: -1 }}>
          No Donation Found
        </Alert>
      ) : (
        <Table bordered>
          <thead>
            <tr>
              <th>No.</th>
              <th>User</th>
              <th>Cause</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {donation.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.userId === null ? "Null" : item.userId.username}</td>
                <td>{item.causeId.title}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {loading && <Loader />}
    </Container>
  );
}

export default Donation;
