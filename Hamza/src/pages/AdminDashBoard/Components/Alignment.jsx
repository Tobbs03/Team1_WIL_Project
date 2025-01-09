import React, { useState, useEffect, useContext } from "react";
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
  GetAlignwithAPI,
  CreateAlingnwithAPI,
  GetBusinessAPI,
} from "../../../utils/http";
import { AuthContext } from "../../../store/auth-context";
import Loader from "../../../components/Loader/Loader";
function Alignment() {
  const [toggle, setToggle] = useState(false);
  const [alignment, setAlignment] = useState([]);
  const [business, setbusiness] = useState([]);

  const [causes, setCauses] = useState([]);
  const authCtx = useContext(AuthContext);
  const adminData = JSON.parse(authCtx.adminToken);
  const [loading, setloading] = useState(false);
  const initialState = {
    businessId: "",
    causeId: "",
  };
  const [inputs, setinputs] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setinputs((prevData) => ({ ...prevData, [name]: value }));
  };

  const FethCauses = async () => {
    const getRes = await GetCauseAPI();
    //  console.log("GetRes: ", getRes);
    if (getRes.success) {
      setCauses(getRes.data);
      console.log("Causesdata", getRes.data);
    }
  };
  const FetchAlignment = async () => {
    setloading(true);
    try {
      const response = await GetAlignwithAPI(adminData?.token);
      // console.log(123);
      console.log("res: ", response);
      if (response?.success) {
        // console.log("Alignwithdata", response?.data);
        setAlignment(response?.data);
        // console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching alignment:", error);
    }
    setloading(false);
  };

  useEffect(() => {
    FethCauses();
  }, [adminData?.adminToken]);

  useEffect(() => {
    // console.log(123);
    FetchAlignment();
  }, [adminData?.adminToken]);

  const handleCreatePromotion = async (e) => {
    setloading(true);
    e.preventDefault();
    try {
      // const formData = new FormData();

      // formData.append("businessId", selectedbusinessId);
      // formData.append("causeId", selectedCauseId);
      const data = {
        businessId: inputs.businessId,
        causeId: inputs.causeId,
      };
      const response = await CreateAlingnwithAPI(data, adminData?.token);
      // console.log("Res :", response);
      // console.log(data);
      // console.log("Id :", inputs.businessId?._id, inputs.causeId?._id);
      // console.log(selectedbusinessId, " ", selectedCauseId);
      if (response?.success) {
        alert("Alignment created");
        console.log("Aling :", response?.data);
        FetchAlignment();
        setToggle(false);
      }
    } catch (error) {
      console.error("Error creating cause:", error);
    }
    setloading(false);
  };

  const FetchData = async () => {
    const response = await GetBusinessAPI(adminData?.adminToken);
    if (response && response.success === true) {
      setbusiness(response.data);
      console.log("Busniess data", response.data);
    }
  };

  useEffect(() => {
    FetchData();
  }, [adminData?.adminToken]);
  return (
    <Container>
      <div>
        <div className="d-flex justify-content-end mb-3">
          <Button
            onClick={() => setToggle(!toggle)}
            variant="success"
            className="w-auto"
          >
            Create Alignwith
          </Button>
        </div>

        {toggle && (
          <div className="input mb-3 mt-3 border-1 border-black p-2">
            <Form onSubmit={handleCreatePromotion}>
              <Form.Group controlId="formBusiness" className="mb-3 w-100">
                <Form.Select
                  name="businessId"
                  value={inputs.businessId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Business</option>
                  {business &&
                    business.map((business) => (
                      <option key={business._id} value={business._id}>
                        {business.name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formCause" className="mb-3 w-100">
                <Form.Select
                  name="causeId"
                  value={inputs.causeId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Cause</option>
                  {causes &&
                    causes.map((cause) => (
                      <option key={cause._id} value={cause._id}>
                        {cause.title}
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
              <th>Business</th>
              <th>Cause</th>
            </tr>
          </thead>
          <tbody>
            {alignment.map((cause, index) => (
              <tr key={cause._id}>
                <td>{index + 1}</td>
                <td>{cause.businessId.name}</td>
                <td>{cause.causeId.title}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {loading && <Loader />}
    </Container>
  );
}

export default Alignment;
