import React, { useState, useContext, useEffect } from "react";
import { Button, Container, Form, Table, Alert } from "react-bootstrap";
import { AuthContext } from "../../../store/auth-context";
import { CreateBusinessAPI, GetBusinessAPI } from "../../../utils/http";
import Loader from "../../../components/Loader/Loader";
function Business() {
  const [toggle, setToggle] = useState(false);
  const [business, setBusiness] = useState([]);
  const authCtx = useContext(AuthContext);
  const adminData = JSON.parse(authCtx.adminToken);
  const [loading, setloading] = useState(false);
  const [inputs, setinputs] = useState({
    name: "",
    description: "",
  });
  const handleCreateBusiness = async (e) => {
    setloading(true);
    e.preventDefault();

    const data = {
      name: inputs.name,
      description: inputs.description,
    };

    try {
      const response = await CreateBusinessAPI(data, adminData?.token);
      if (response.success) {
        alert("Business created");
        setToggle(false);
        FetchData();
      }
    } catch (error) {
      console.error("Error creating cause:", error.message);
    }
    setloading(false);
  };

  const FetchData = async () => {
    setloading(true);
    const response = await GetBusinessAPI(adminData?.adminToken);
    if (response && response.success === true) {
      setBusiness(response.data);
      // console.log("Busniess data", response.data);
    }
    setloading(false);
  };

  useEffect(() => {
    FetchData();
  }, [adminData?.adminToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setinputs((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Container>
      <div>
        <div className="d-flex justify-content-end mb-3">
          <Button
            onClick={() => setToggle(!toggle)}
            variant="success"
            className="w-auto"
          >
            Create Business
          </Button>
        </div>

        {toggle && (
          <div className="input mb-3 mt-3 border-1 border-black p-2">
            <Form onSubmit={handleCreateBusiness}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                  required
                  placeholder="Write title"
                />
              </Form.Group>
              <Form.Group controlId="formDescription" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={inputs.description}
                  onChange={handleChange}
                  required
                  placeholder="Write description"
                />
              </Form.Group>
              <Button type="submit" variant="success" className="w-100">
                Submit
              </Button>
            </Form>
          </div>
        )}

        <Table bordered>
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {business.map((cause, index) => (
              <tr key={cause._id}>
                <td>{index + 1}</td>
                <td>{cause.name}</td>
                <td>{cause.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {loading && <Loader />}
    </Container>
  );
}

export default Business;
