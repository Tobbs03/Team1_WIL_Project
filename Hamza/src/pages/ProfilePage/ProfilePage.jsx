import React, { useContext, useEffect, useState } from "react";
import styles from "./ProfilePage.module.css";
import formStyles from "../CausesInnerPages/CreateCausePage/CreateCause.module.css";
import Dummy from "../../assets/walking-dude.jpg";
import { AuthContext } from "../../store/auth-context";
import Loader from "../../components/Loader/Loader";
import { GetUserAPI } from "../../utils/http";
import { UpdateUserAPI } from "../../utils/http";
import { BaseUrl } from "../../utils/http";

const ProfilePage = () => {
  const authCtx = useContext(AuthContext);
  const userData = JSON.parse(authCtx.userToken);
  const [loading, setLoading] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [profileimg, setprofileimg] = useState("");
  const [inputs, setInputs] = useState({
    name: {
      value: userData?.doc?.name || "",
      isValid: true,
    },
    username: {
      value: userData?.doc?.username || "",
      isValid: true,
    },
    email: {
      value: userData?.doc?.email || "",
      isValid: true,
    },
    bio: {
      value: "",
      isValid: true,
    },
    // name: {
    //   value: "",
    //   isValid: true,
    // },
    // username: {
    //   value: "",
    //   isValid: true,
    // },
    // email: {
    //   value: "",
    //   isValid: true,
    // },
    // bio: {
    //   value: "",
    //   isValid: true,
    // },
  });
  const [links, setLinks] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const FetchUserDetails = async () => {
      setLoading(true);
      const getRes = await GetUserAPI(userData?.token);
      // console.log("Get Res: ", getRes.user.name);
      // console.log("Get Res: ", getRes);

      if (getRes.success) {
        const UserDetails = getRes.data;
        // console.log("UserDetails", UserDetails);
        setInputs({
          name: {
            value: UserDetails.name || "",
            isValid: true,
          },
          username: {
            value: UserDetails.username || "",
            isValid: true,
          },
          email: {
            value: UserDetails.email || "",
            isValid: true,
          },
          bio: {
            value: UserDetails.bio || "",
            isValid: true,
          },
        });
        setLinks(UserDetails.links || []);

        if (UserDetails.image) {
          // console.log(UserDetails.image);
          setprofileimg(UserDetails.image);
          // setImage({ fileBlob: UserDetails.profileImage });
        }
      } else {
        alert("Failed to fetch user details");
      }
      setLoading(false);
    };

    if (userData?.token) {
      // console.log("123");
      FetchUserDetails();
    }
  }, [userData?.token]);

  // console.log(userData?.token);

  // const UpdateDetails = async () => {
  //   setLoading(true);
  //   const updatedata = {
  //     name: inputs.name.value,
  //     username: inputs.username.value,
  //     email: inputs.email.value,
  //     bio: inputs.bio.value,
  //     links: links,
  //     image: image?.fileBlob,
  //   };
  //   try {
  //     const updateRes = await UpdateUserAPI(updatedata, userData.token);
  //     console.log("Update Response: ", updateRes);
  //     if (updateRes.success) {
  //       alert("Profile updated successfully");
  //       setEditProfile(false);
  //     } else {
  //       alert(`Error: ${updateRes.message}`);
  //       alert("An error occurred while updating your profile.");
  //     }
  //   } catch (error) {
  //     alert(`Error: ${error.message}`);
  //   }
  //   setLoading(false);
  // };

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: {
          value:
            inputIdentifier == "username"
              ? enteredValue.replace(/\s/g, "")
              : enteredValue,
          isValid: !!enteredValue || inputIdentifier === "bio",
        },
      };
    });
  }

  const addLink = () => {
    setLinks([...links, ""]); // Adds a new empty string to the links array
  };

  const removeLinks = (index) => {
    const remainingLinks = links.filter((item, i) => i !== index);

    setLinks(remainingLinks);
  };

  const updateLink = (index, newLink) => {
    const newLinks = links.slice();
    newLinks[index] = newLink;
    setLinks(newLinks);
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);

    const requiredObj = {
      filename: file.name,
      fileBlob: imageUrl,
      sendFile: file,
    };

    setImage(requiredObj);
  };
  const UserLogout = () => {
    authCtx.logout();
    authCtx.userLogout();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", inputs.name.value);
    formData.append("username", inputs.username.value);
    formData.append("email", inputs.email.value);
    for (let i = 0; i < links.length; i++) {
      formData.append(`links[${i}]`, links[i]);
    }
    // formData.append(" links", JSON.stringify(links));
    formData.append("image", image?.sendFile);
    formData.append("bio", inputs.bio.value);
    // console.log(image?.sendFile);
    // for (let pair of formData) {
    //   console.log(pair[0], ", ", pair[1]);
    // }

    // const updatedata = {
    //   name: inputs.name.value,
    //   username: inputs.username.value,
    //   email: inputs.email.value,
    //   bio: inputs.bio.value,
    //   links: links,
    //   image: image?.sendFile,
    // };
    try {
      const updateRes = await UpdateUserAPI(formData, userData.token);
      // console.log("Update Response: ", updateRes);
      if (updateRes.success) {
        alert("Profile updated successfully");
        setEditProfile(false);
        const getRes = await GetUserAPI(userData?.token);
        // console.log("Get Res: ", getRes.user.name);
        // console.log("Get Res: ", getRes.user);

        if (getRes.success) {
          const UserDetails = getRes.data;
          setInputs({
            name: {
              value: UserDetails.name || "",
              isValid: true,
            },
            username: {
              value: UserDetails.username || "",
              isValid: true,
            },
            email: {
              value: UserDetails.email || "",
              isValid: true,
            },
            bio: {
              value: UserDetails.bio || "",
              isValid: true,
            },
          });
          setLinks(UserDetails.links || []);

          if (UserDetails.image) {
            // console.log(UserDetails.image);
            setprofileimg(UserDetails.image);
            // setImage({ fileBlob: UserDetails.profileImage });
          }
          authCtx.userProfileUpdate();
        } else {
          alert("Failed to fetch user details");
        }
      } else {
        alert(`Error: ${updateRes.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className={styles.container}>
        {!editProfile ? (
          <div className={styles.profileContainer}>
            <h1>User Profile</h1>
            <div className={styles.imgContainer}>
              {profileimg ? (
                <img
                  className={styles.imageStyles}
                  src={BaseUrl + "/" + profileimg}
                  alt="Profile Image"
                />
              ) : (
                <div className={styles.iconContainer}>
                  <i className={`fa-solid fa-user ${styles.iconStyles}`}></i>
                </div>
              )}
            </div>

            <div className={styles.infoContainer}>
              <div className={styles.infoView}>
                <p>Name</p>
                <div className={styles.infoValueContainer}>
                  <p>{inputs.name.value}</p>
                </div>
              </div>
              <div className={styles.infoView}>
                <p>Username</p>
                <div className={styles.infoValueContainer}>
                  <p>{inputs.username.value}</p>
                </div>
              </div>
              <div className={styles.infoView}>
                <p>Email</p>
                <div className={styles.infoValueContainer}>
                  <p>{inputs.email.value}</p>
                </div>
              </div>
              <div className={styles.infoView}>
                <p>Links</p>
                <div className={styles.infoValueContainer}>
                  {links &&
                    links.map((item, index) => {
                      return (
                        <p key={index} className={styles.link}>
                          {item}
                        </p>
                      );
                    })}
                  {/* <p className={styles.link}>{links ? links : "mylink.net"}</p>
                  <p className={styles.link}>{links ? links : "youlink.net"}</p> */}
                </div>
              </div>
              <div className={styles.infoView}>
                <p>Bio</p>
                <div className={styles.infoValueContainer}>
                  <p>{inputs.bio.value ? inputs.bio.value : "CarPediem"} </p>
                </div>
              </div>

              <div className={styles.buttonBox}>
                <button
                  type="button"
                  className={styles.editBtn}
                  onClick={() => {
                    setEditProfile(!editProfile);
                  }}
                >
                  Edit Profile
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  type="button"
                  className={styles.logoutBtn}
                  // onClick={() => {
                  //   authCtx.userLogout();
                  // }}
                  onClick={UserLogout}
                >
                  Logout
                  <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.profileContainer}>
            <h1>Edit Profile</h1>

            <div>
              <label
                htmlFor="select-image"
                className={`${styles.imgContainer}`}
              >
                <div className={styles.imgEditBox}>
                  {image ? (
                    <img
                      className={styles.imageStyles}
                      // src={BaseUrl + "/" + profileimg}
                      src={image?.fileBlob}
                      alt="Profile Image"
                    />
                  ) : false ? (
                    <img
                      className={styles.imageStyles}
                      src={Dummy}
                      alt="Profile Image"
                    />
                  ) : (
                    <div className={styles.iconContainer}>
                      <i
                        className={`fa-solid fa-user ${styles.iconStyles}`}
                      ></i>
                    </div>
                  )}

                  <i className={`fa-solid fa-camera ${styles.camIcon}`}></i>
                </div>
              </label>

              <input
                type="file"
                accept="image/*"
                id="select-image"
                name="image"
                style={{ display: "none" }}
                onChange={(e) => {
                  handleImageSelect(e);
                }}
              />
            </div>

            <div className={styles.infoContainer}>
              <div className={formStyles.inputContainer}>
                <label htmlFor="user-og-name">Name*</label>
                <div
                  className={`${formStyles.inputWrapper} ${
                    !inputs.name.isValid ? formStyles.inputError : null
                  }`}
                >
                  <input
                    type="text"
                    id="user-og-name"
                    name="name"
                    required
                    className={formStyles.inputControl}
                    placeholder="ex: Jon Doe"
                    value={inputs.name.value}
                    onChange={(e) => {
                      inputChangeHandler("name", e.target.value);
                    }}
                  />
                </div>
                {!inputs.name.isValid && (
                  <span className={formStyles.errorText}>
                    Please Enter your Name
                  </span>
                )}
              </div>

              <div className={formStyles.inputContainer}>
                <label htmlFor="user-og-username">Username*</label>
                <div
                  className={`${formStyles.inputWrapper} ${
                    !inputs.username.isValid ? formStyles.inputError : null
                  }`}
                >
                  <input
                    type="text"
                    id="user-og-username"
                    name="username"
                    required
                    className={formStyles.inputControl}
                    placeholder="ex: Jon.Doe"
                    value={inputs.username.value}
                    onChange={(e) => {
                      inputChangeHandler("username", e.target.value);
                    }}
                  />
                </div>
                {!inputs.username.isValid && (
                  <span className={formStyles.errorText}>
                    Please Enter your Username
                  </span>
                )}
              </div>

              <div className={formStyles.inputContainer}>
                <label htmlFor="user-og-email">Email*</label>
                <div
                  className={`${formStyles.inputWrapper} ${
                    !inputs.email.isValid ? formStyles.inputError : null
                  }`}
                >
                  <input
                    type="email"
                    id="user-og-email"
                    name="email"
                    required
                    className={formStyles.inputControl}
                    placeholder="ex: jon.doe@gmail.com"
                    value={inputs.email.value}
                    onChange={(e) => {
                      inputChangeHandler("email", e.target.value);
                    }}
                  />
                </div>
                {!inputs.email.isValid && (
                  <span className={formStyles.errorText}>
                    Please Enter your Email
                  </span>
                )}
              </div>

              <div className={formStyles.inputContainer}>
                <label htmlFor="user-og-links">Links*</label>
                {links.map((item, index) => {
                  return (
                    <div key={index} className={styles.linkWrapper}>
                      <div
                        className={formStyles.inputWrapper}
                        style={{ flex: 1 }}
                      >
                        <input
                          type="text"
                          id="user-og-link"
                          name="link"
                          required
                          className={formStyles.inputControl}
                          placeholder="Enter a link.."
                          value={item}
                          onChange={(e) => {
                            updateLink(index, e.target.value);
                          }}
                        />
                      </div>
                      <i
                        className="fa-solid fa-xmark"
                        onClick={() => {
                          removeLinks(index);
                        }}
                      ></i>
                    </div>
                  );
                })}

                <button
                  type="button"
                  className={styles.addBtn}
                  onClick={() => {
                    addLink();
                  }}
                >
                  <i className="fa-solid fa-plus"></i>
                  Add Link
                </button>
              </div>

              <div className={formStyles.inputContainer}>
                <label htmlFor="user-og-bio">Bio</label>
                <div
                  className={`${formStyles.inputWrapper} ${
                    !inputs.bio.isValid ? formStyles.inputError : null
                  }`}
                >
                  <input
                    type="text"
                    id="user-og-bio"
                    name="bio"
                    className={formStyles.inputControl}
                    placeholder=""
                    value={inputs.bio.value}
                    onChange={(e) => {
                      inputChangeHandler("bio", e.target.value);
                    }}
                  />
                </div>
                {!inputs.bio.isValid && (
                  <span className={formStyles.errorText}>Please Enter Bio</span>
                )}
              </div>

              <div className={styles.buttonBox}>
                <button
                  type="button"
                  className={styles.logoutBtn}
                  onClick={() => {
                    setEditProfile(!editProfile);
                  }}
                >
                  Cancel
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <button
                  type="submit"
                  className={styles.editBtn}
                  // onClick={UpdateDetails}
                >
                  Submit
                  <i className="fa-solid fa-pen"></i>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default ProfilePage;

// export async function DeleteCauseAPI(id, token) {
//   return await APICall(
//     BaseUrl + "/deleteCause" + "/" + id,
//     "DELETE",
//     {},
//     {
//       Authorization: `Bearer ${token}`,
//     }
//   );
// }
