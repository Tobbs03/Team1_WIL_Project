import React, { useEffect, useState, useContext } from "react";
import { Alert, Container, Table } from "react-bootstrap";
import { GetContactAPI } from "../../../utils/http";
import { AuthContext } from "../../../store/auth-context";
import Loader from "../../../components/Loader/Loader";
function Contact() {
  const [Contact, setContact] = useState([]);
  const authCtx = useContext(AuthContext);
  const adminData = JSON.parse(authCtx.adminToken);
  const [loading, setloading] = useState(false);
  const FetchContact = async () => {
    setloading(true);
    try {
      const response = await GetContactAPI(adminData?.token);
      if (response.success) {
        setContact(response?.data);
        // console.log("Contact Data", response.data);
      }
    } catch (error) {
      console.error("Error in Get contact:", error.message);
    }
    setloading(false);
  };
  useEffect(() => {
    FetchContact();
  }, [adminData?.adminToken]);

  return (
    <Container>
      {!Contact.length > 0 ? (
        <Alert> No one Will Contact</Alert>
      ) : (
        <div>
          <Table bordered>
            <thead>
              <tr>
                <th>No.</th>
                <th>First-Name</th>
                <th>Last-Name</th>
                <th>E-mali</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {Contact.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.message}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {loading && <Loader />}
    </Container>
  );
}

export default Contact;
