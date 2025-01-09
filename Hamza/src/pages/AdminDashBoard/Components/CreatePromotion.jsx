import React, { useState, useEffect, useContext } from "react";
import { Button, Container, Form, Table, Alert } from "react-bootstrap";
import { AuthContext } from "../../../store/auth-context";
import {
  GetPromotionAPI,
  CreatePromotionAPI,
  GetBusinessAPI,
  DeletePromotion,
} from "../../../utils/http";
import Loader from "../../../components/Loader/Loader";
function CreatePromotion() {
  const [toggle, setToggle] = useState(false);
  const [causes, setCauses] = useState([]);
  const [business, setBusiness] = useState([]);
  const authCtx = useContext(AuthContext);
  const adminData = JSON.parse(authCtx.adminToken);
  const [loading, setloading] = useState(false);
  const initialinputs = {
    title: "",
    description: "",
    businessId: "",
  };
  const [inputs, setinputs] = useState(initialinputs);
  // const [selectedbusinessId, setSelectedbusinessId] = useState("");
  // const handleChange = (e) => {
  //   if (e.target.name === "businessId") {
  //     setSelectedbusinessId(e.target.value);
  //   } else {
  //     setinputs({ ...inputs, [e.target.name]: e.target.value });
  //   }
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setinputs((prevData) => ({ ...prevData, [name]: value }));
  };
  // const handleChange = (inputidentifier, entervalue) => {
  //   setinputs((currentinputs) => {
  //     return {
  //       ...currentinputs,
  //       [inputidentifier]: {
  //         value: entervalue,
  //       },
  //     };
  //   });
  // };

  const FetchPromotion = async () => {
    setloading(true);
    try {
      const response = await GetPromotionAPI(adminData?.token);
      if (response.success) {
        setCauses(response?.data);
        console.log("FetcPromtiondata", response?.data);
      }
    } catch (error) {
      console.error("Error fetching causes:", error.message);
    }
    setloading(false);
  };
  useEffect(() => {
    FetchPromotion();
  }, [adminData?.token]);

  const handleCreatePromotion = async (e) => {
    setloading(true);
    e.preventDefault();
    try {
      // const formData = new FormData();
      // formData.append("title", inputs.title);
      // formData.append("description", inputs.description);
      // formData.append("businessId", inputs.businessId);
      const data = {
        title: inputs.title,
        description: inputs.description,
        businessId: inputs.businessId,
      };
      // console.log("DATA", data);
      // console.log("inputs", inputs);
      const response = await CreatePromotionAPI(data, adminData?.token);
      if (response?.success) {
        alert("Promotion created");
        FetchPromotion();
        setToggle(false);
      } else {
        console.error("Failed to create promotion:", response?.message);
      }
    } catch (error) {
      console.error("Error  in create promotion:", error.message);
    }
    setloading(false);
    setinputs(initialinputs);
  };

  const FetchData = async () => {
    const response = await GetBusinessAPI();
    // console.log("1323: ", adminData?.token);
    // console.log("getRes: ", response);
    if (response && response.success === true) {
      setBusiness(response.data);
      // console.log("Business Data", response.data);
      // console.log("Busniess data", response.data);
    }
  };
  useEffect(() => {
    FetchData();
  }, [adminData?.token]);

  const DeleteData = async (selectedData) => {
    try {
      // console.log(1234);
      const response = await DeletePromotion(
        selectedData?._id,
        adminData.token
      );
      if (response.success) {
        // setCauses((prevCauses) =>
        //   prevCauses.filter((cause) => cause._id !== selectedData._id)
        // );
        FetchPromotion();
        // console.log("Delete Res", response);
        // console.log(5555);
      }
    } catch (error) {
      console.error("Error Deleting data:", error);
    }
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
            Create Promotion
          </Button>
        </div>

        {toggle && (
          <div className="mb-3 mt-3 p-2 border">
            <Form onSubmit={handleCreatePromotion}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={inputs.title}
                  onChange={handleChange}
                  required
                  placeholder="Write title"
                />
              </Form.Group>
              <Form.Group className="mb-3">
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
              <Form.Group className="mb-3">
                <Form.Label>Business</Form.Label>
                <Form.Select
                  name="businessId"
                  onChange={handleChange}
                  required
                  value={inputs.businessId}
                >
                  <option>Select Business</option>
                  {business.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
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
              <th>Business</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {causes.map((cause, index) => (
              <tr key={cause._id}>
                <td>{index + 1}</td>
                <td>{cause.title}</td>
                <td>{cause.description}</td>
                <td>{cause.businessId}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Button
                      variant="danger"
                      style={{ padding: "5px" }}
                      onClick={() => {
                        DeleteData(cause);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {loading && <Loader />}
    </Container>
  );
}

export default CreatePromotion;
