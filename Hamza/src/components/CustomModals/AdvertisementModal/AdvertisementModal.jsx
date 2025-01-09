import React, { useState, useEffect, useContext } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { GetBusinessAPI, CreatePromotionAPI } from "../../../utils/http";
import { AuthContext } from "../../../store/auth-context";
function AdvertisementModal({ state, fun }) {
  const [loading, setloading] = useState(false);
  const [business, setBusiness] = useState([]);
  const authCtx = useContext(AuthContext);
  const userData = JSON.parse(authCtx.userToken);
  const initialinputs = {
    title: "",
    description: "",
    businessId: "",
  };
  const [inputs, setinputs] = useState(initialinputs);
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
  }, [userData?.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setinputs((prevData) => ({ ...prevData, [name]: value }));
  };
  // const handleImageSelect = (event) => {
  //   const file = event.target.files[0];
  //   if (!file) {
  //     setinputs((currentInput) => {
  //       return {
  //         ...currentInput,
  //         ["Image"]: {
  //           value: null,
  //           isValid: false,
  //         },
  //       };
  //     });
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     const requiredObj = {
  //       filename: file.name,
  //       fileBlob: reader.result,
  //       sendFile: file,
  //     };
  //     setinputs((currentInput) => {
  //       return {
  //         ...currentInput,
  //         Image: {
  //           value: requiredObj,
  //           isValid: true,
  //         },
  //       };
  //     });
  //     setimgstate(requiredObj);
  //   };
  //   reader.readAsDataURL(file);
  // };
  const handalsubmit = async (e) => {
    setloading(true);
    e.preventDefault();
    try {
      const data = {
        title: inputs.title,
        description: inputs.description,
        businessId: inputs.businessId,
      };
      const response = await CreatePromotionAPI(data, userData?.token);
      if (response?.success) {
        alert("Promotion created");
      } else {
        console.error("Failed to create promotion:", response?.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
    setloading(false);
    fun();
  };
  return (
    <>
      <Modal show={state} onHide={fun}>
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title className="Modal-title w-100">
            <h4> Add Advertisement</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handalsubmit}>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="N"> title</Form.Label>
              <Form.Control
                className="border-success py-2 my-2"
                name="title"
                value={inputs.title}
                required
                id="N"
                placeholder="title"
                onChange={handleChange}
              />
              {/* {!inputs.title.isValid && (
                <span className="text-warning">Please enter the name !</span>
              )} */}
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
            <Form.Group className="mb-2">
              <Form.Label htmlFor="Des">Description</Form.Label>
              <Form.Control
                className="border-success"
                name="description"
                value={inputs.description}
                required
                rows={4}
                id="Des"
                placeholder="About"
                as="textarea"
                onChange={handleChange}
              />
              {/* {!inputs.description.isValid && (
                <span className="text-warning">
                  Please write the Description !
                </span>
              )} */}
            </Form.Group>

            <Button className="bg-blue w-100" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AdvertisementModal;
