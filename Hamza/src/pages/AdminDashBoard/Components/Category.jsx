import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Container,
  Form,
  Table,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { GetCategoryAPI, CreateCategoryAPI } from "../../../utils/http";
import { AuthContext } from "../../../store/auth-context";
import Loader from "../../../components/Loader/Loader";
function Category() {
  const [toggle, setToggle] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const authCtx = useContext(AuthContext);
  const adminData = JSON.parse(authCtx.adminToken);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const FatchData = async () => {
      setloading(true);
      try {
        const response = await GetCategoryAPI();
        if (response.success) {
          // console.log("GetCategoryAPI" + JSON.stringify(response.data));
          setCategories(response.data);
        }
      } catch (error) {
        alert("Error fetching data:", error);
      }
      setloading(false);
    };
    FatchData();
  }, []);

  const handleCreateCategory = async () => {
    // console.log(1);
    setloading(true);
    const data = {
      name: newCategoryName,
    };
    try {
      const response = await CreateCategoryAPI(data, adminData?.token);
      // console.log(response);
      if (response?.success) {
        const updatedRes = await GetCategoryAPI();
        if (updatedRes?.success) {
          setCategories(updatedRes?.data);
          alert("Catergory created");
          setToggle(false);
        }
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
    setloading(false);
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
            Create Category
          </Button>
        </div>
        {toggle && (
          <InputGroup className="mb-3 mt-3">
            <Form.Control
              type="text"
              placeholder="Category Name"
              aria-label="Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <Button
              variant="success"
              id="button-addon2"
              onClick={handleCreateCategory}
            >
              Submit
            </Button>
          </InputGroup>
        )}

        <Table bordered>
          <thead>
            <tr>
              <th>No.</th>
              <th>Category Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {loading && <Loader />}
    </Container>
  );
}

export default Category;
