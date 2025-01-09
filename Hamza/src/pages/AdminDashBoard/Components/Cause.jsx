import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  Table,
  Dropdown,
  Alert,
} from "react-bootstrap";
import {
  GetCauseAPI,
  CreateCauseAPI,
  GetCategoryAPI,
  DeleteCauseAPI,
  UpdateCauseAPI,
  BaseUrl,
} from "../../../utils/http";
import { AuthContext } from "../../../store/auth-context";
import Loader from "../../../components/Loader/Loader";

function Cause() {
  const [toggle, setToggle] = useState(false);
  const [causes, setCauses] = useState([]);
  const [categories, setCategories] = useState([]);
  const authCtx = useContext(AuthContext);
  const adminData = JSON.parse(authCtx.adminToken);
  const [loading, setloading] = useState(false);
  // const [data, setData] = useState({
  //   title: "",
  //   description: "",
  //   image: null,
  //   categoryId: "",
  // });
  const initialdata = {
    title: {
      value: "",
      isValid: true,
    },
    description: {
      value: "",
      isValid: true,
    },
    image: {
      value: null,
      isValid: true,
    },
    categoryId: {
      value: "",
      isValid: true,
    },
  };
  const [inputs, setinputs] = useState(initialdata);
  // const [selectedCategoryId, setSelectedCategoryId] = useState("");
  function handleChange(inputidentifier, entervalue) {
    setinputs((currentinputs) => {
      return {
        ...currentinputs,
        [inputidentifier]: {
          value: entervalue,
          isValid: true,
        },
      };
    });
  }
  const handleImageSelecte = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setinputs((currentInputs) => {
        return {
          ...currentInputs,
          ["image"]: {
            value: null,
            isValid: false,
          },
        };
      });
      return;
    }
    const imageURL = URL.createObjectURL(file);
    const requiredObj = {
      filename: file.name,
      fileBlob: imageURL,
      sendFile: file,
    };
    setinputs((currentInputs) => {
      return {
        ...currentInputs,
        ["image"]: {
          value: requiredObj,
          isValid: true,
        },
      };
    });
  };

  const FethCauses = async () => {
    setloading(true);
    const getRes = await GetCauseAPI();
    console.log("GetRes: ", getRes);
    if (getRes.success) {
      setCauses(getRes.data);
      // console.log("Causesdata :123:", JSON.stringify(getRes.data));
    }
    setloading(false);
  };

  const handleCreateCause = async (e) => {
    setloading(true);
    e.preventDefault();
    const titleIsValid = inputs.title.value.trim().length > 0;
    const descIsValid = inputs.description.value.trim().length > 0;
    const imageIsValid = !!inputs.image.value;
    const categoryIdIsValid = inputs.categoryId.value.length > 0;
    if (!titleIsValid || !descIsValid || !imageIsValid || !categoryIdIsValid) {
      setinputs((curInputs) => {
        return {
          title: {
            value: curInputs.title.value,
            isValid: titleIsValid,
          },
          description: {
            value: curInputs.description.value,
            isValid: descIsValid,
          },
          image: {
            value: curInputs.image.value,
            isValid: imageIsValid,
          },
          categoryId: {
            value: curInputs.categoryId.value,
            isValid: categoryIdIsValid,
          },
        };
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", inputs.title.value);
      formData.append("description", inputs.description.value);
      formData.append("image", inputs.image.value.sendFile);
      formData.append("categoryId", inputs.categoryId.value);

      const response = await CreateCauseAPI(formData, adminData.token);
      if (response.success) {
        alert("Cause created");
        // console.log(response.data?.success);
        FethCauses();
        setToggle(false);
      }
    } catch (error) {
      console.error("Error creating cause:", error);
    }
    setinputs(initialdata);
    setloading(false);
  };
  useEffect(() => {
    FatchData();
  }, [adminData?.token]);

  const FatchData = async () => {
    try {
      const response = await GetCategoryAPI();
      if (response.success) {
        // console.log("GetCategoryAPI" + JSON.stringify(response.data));
        setCategories(response.data);
      }
    } catch (error) {
      alert("Error fetching data:", error);
    }
  };

  const DeleteData = async (selectedData) => {
    try {
      const response = await DeleteCauseAPI(selectedData?._id, adminData.token);
      if (response.success === true) {
        // console.log(response?.data?.success);
        alert(response.message);
        FethCauses();
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error Deleting data:", error.message);
    }
  };

  const ApproveStatus = async (selectedData) => {
    const data = {
      status: "Approved",
    };
    try {
      const response = await UpdateCauseAPI(
        selectedData?._id,
        data,
        adminData.token
      );
      if (response) {
        if (response?.success === true) {
          alert(response?.message);
          FethCauses();
        } else {
          alert(response?.message);
        }
      }
    } catch (error) {
      console.log("Error Updating data:", error.message);
    }
  };
  const DeclineStatus = async (selectedData) => {
    const data = {
      status: "Declined",
    };
    try {
      const response = await UpdateCauseAPI(
        selectedData?._id,
        data,
        adminData.token
      );
      if (response) {
        if (response.success === true) {
          alert(response.message);
          FethCauses();
        } else {
          alert(response?.message);
        }
      }
    } catch (error) {
      console.log("Error Updating data:", error.message);
    }
  };

  useEffect(() => {
    FethCauses();
  }, [adminData?.token]);

  return (
    <Container>
      <div>
        <div className="d-flex justify-content-end mb-3">
          <Button
            onClick={() => setToggle(!toggle)}
            variant="success"
            className="w-auto"
          >
            Create Cause
          </Button>
        </div>
        {toggle && (
          <div className="mb-3 mt-3 p-2 border">
            <Form onSubmit={handleCreateCause}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={inputs.title.value}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                  placeholder="Write title"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={inputs.description.value}
                  onChange={(e) => handleChange("description", e.target.value)}
                  required
                  placeholder="Write description"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  onChange={(e) => {
                    handleChange("categoryId", e.target.value);
                  }}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 mt-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={(event) => {
                    handleImageSelecte(event);
                  }}
                  required
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
              <th>Category</th>
              <th>Image</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {causes.map((cause, index) => (
              <tr key={cause._id}>
                <td>{index + 1}</td>
                <td>{cause.title}</td>
                <td>{cause.description}</td>
                <td>{cause.categoryId.name}</td>
                <td>
                  <img
                    style={{ width: "50px" }}
                    src={`${BaseUrl}/${cause.image}`}
                    alt="Images"
                  />
                </td>
                <td
                  style={{
                    color: cause.status === "Approved" ? "#039487" : "#d14249",
                  }}
                >
                  {cause.status}
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    {cause.status === "Pending" ? (
                      <>
                        <Button
                          variant="success"
                          style={{ padding: "5px" }}
                          onClick={() => ApproveStatus(cause)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          style={{ padding: "5px" }}
                          onClick={() => DeclineStatus(cause)}
                        >
                          Decline
                        </Button>
                      </>
                    ) : null}
                    <Button
                      variant="dark"
                      style={{ padding: "5px" }}
                      onClick={() => DeleteData(cause)}
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

export default Cause;
