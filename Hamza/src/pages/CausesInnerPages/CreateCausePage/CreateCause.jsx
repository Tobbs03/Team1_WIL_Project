import React, { useContext, useEffect, useState } from "react";
import styles from "./CreateCause.module.css";
import { useNavigate } from "react-router-dom";
import { CreateCauseAPI, GetCategoryAPI } from "../../../utils/http";
import Loader from "../../../components/Loader/Loader";
import { AuthContext } from "../../../store/auth-context";

const CreateCause = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Image, setImage] = useState(null);
  const [inputs, setInputs] = useState({
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
  });

  useEffect(() => {
    FetchCategories();
  }, []);

  const FetchCategories = async () => {
    const getRes = await GetCategoryAPI();
    console.log("GetRes 123: ", getRes);
    if (getRes.success) {
      setCategories(getRes.data);
    }
  };

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: {
          value: enteredValue,
          isValid: true,
        },
      };
    });
  }

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    const requiredObj = {
      filename: file.name,
      fileBlob: imageUrl,
      sendFile: file,
    };
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        image: {
          value: requiredObj,
          isValid: true,
        },
      };
    });
    // setImage(requiredObj);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const titleIsValid = inputs.title.value.trim().length > 0;
    const descIsValid = inputs.description.value.trim().length > 0;
    const imageIsValid = !!inputs.image.value;
    const categoryIdIsValid = inputs.categoryId.value.length > 0;

    if (!titleIsValid || !descIsValid || !imageIsValid || !categoryIdIsValid) {
      setInputs((curInputs) => {
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

    setLoading(true);

    const formData = new FormData();
    formData.append("title", inputs.title.value);
    formData.append("description", inputs.description.value);
    formData.append("image", inputs.image.value.sendFile);
    // formData.append("image", Image?.sendFile);
    formData.append("categoryId", inputs.categoryId.value);

    const userData = JSON.parse(authCtx.userToken);
    const submitRes = await CreateCauseAPI(formData, userData.token);
    alert(submitRes.message);
    if (submitRes.success) {
      navigate(-1);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.formComponent}>
          <div className={styles.headerContainer}>
            <button
              type="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>

            <p>Create Cause</p>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="cause-title">Title</label>
            <div
              className={`${styles.inputWrapper} ${
                !inputs.title.isValid ? styles.inputError : null
              }`}
            >
              <input
                type="text"
                id="cause-title"
                name="title"
                required
                className={styles.inputControl}
                placeholder="Enter Title"
                value={inputs.title.value}
                onChange={(e) => {
                  inputChangeHandler("title", e.target.value);
                }}
              />
            </div>
            {!inputs.title.isValid && (
              <span className={styles.errorText}>Please Enter Title Here!</span>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="cause-desc">Description</label>
            <div
              className={`${styles.inputWrapper} ${
                !inputs.description.isValid ? styles.inputError : null
              }`}
            >
              <textarea
                type="text"
                id="cause-desc"
                name="description"
                required
                rows={4}
                className={styles.inputControl}
                placeholder="Enter Description"
                value={inputs.description.value}
                onChange={(e) => {
                  inputChangeHandler("description", e.target.value);
                }}
              />
            </div>
            {!inputs.description.isValid && (
              <span className={styles.errorText}>
                Please Enter your Description
              </span>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="category-dropdown">Select Category</label>
            <div
              className={`${styles.inputWrapper} ${
                !inputs.categoryId.isValid ? styles.inputError : null
              }`}
            >
              <select
                id="category-dropdown"
                className={styles.inputControl}
                name="category"
                onChange={(e) => {
                  inputChangeHandler("categoryId", e.target.value);
                }}
                required
              >
                <option value="">Select Category</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            {!inputs.categoryId.isValid && (
              <span className={styles.errorText}>Please Select Category</span>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="select-image">Image</label>
            <div
              className={`${styles.inputWrapper} ${
                !inputs.image.isValid ? styles.inputError : null
              }`}
            >
              <input
                type="file"
                accept="image/*"
                id="select-image"
                name="image"
                required
                className={styles.inputControl}
                placeholder=""
                onChange={handleImageSelect}
              />
            </div>
            {!inputs.image.isValid && (
              <span className={styles.errorText}>Please Select Image</span>
            )}
          </div>

          <div className={styles.buttonBox}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              Submit
            </button>
          </div>
        </form>
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default CreateCause;
