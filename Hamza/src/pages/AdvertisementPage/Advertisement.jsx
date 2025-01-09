import React, { useState, useContext, useEffect } from "react";
import AdvertisementCard from "../../components/Cards/Advertisementcard/AdvertisementCard";
import AdvertisementModal from "../../components/CustomModals/AdvertisementModal/AdvertisementModal";
import "./Advertisement.css";
import { Container, Button } from "react-bootstrap";
import { AuthContext } from "../../store/auth-context";
import { GetDonationAPI, GetPromotionAPI } from "../../utils/http";

const Advertisement = () => {
  const [modal, setmodal] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);
  const authCtx = useContext(AuthContext);
  const userData = JSON.parse(authCtx.userToken);
  const adminData = JSON.parse(authCtx.adminToken);
  // console.log("User login", isLoggedIn);
  // const Data = [
  //   {
  //     // Number: "1",
  //     Name: "A",
  //     imgsrc:
  //       "https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60",
  //     Description: "Lorem ipsum dolor sit amet ",
  //   },
  //   {
  //     // Number: "2",
  //     Name: "A",
  //     imgsrc:
  //       "https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60",
  //     Description: "Lorem ipsum dolor sit amet ",
  //   },
  //   {
  //     // Number: "3",
  //     Name: "A",
  //     imgsrc:
  //       "https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60",
  //     Description: "Lorem ipsum dolor sit amet ",
  //   },
  //   {
  //     // Number: " 4",
  //     Name: "A",
  //     imgsrc:
  //       "https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60",
  //     Description: "Lorem ipsum dolor sit amet ",
  //   },
  // ];

  const [data, setdata] = useState([
    { title: "Random Title 1", description: "Random description 1" },
    { title: "Random Title 2", description: "Random description 2" },
    { title: "Random Title 3", description: "Random description 3" },
    { title: "Random Title 4", description: "Random description 4" },
    { title: "Random Title 5", description: "Random description 5" },
  ]);

  // const [data, setdata] = useState(() => {
  //   const savedData = localStorage.getItem("advertisementData");
  //   return savedData ? JSON.parse(savedData) : Data;
  // });
  const GetData = async () => {
    try {
      const response = await GetPromotionAPI(userData?.token);
      if (response.success) {
        setdata(response?.data);
        // console.log("Data" + JSON.stringify(response?.data));
      }
    } catch (error) {
      console.log("Error in Getting Data", error.message);
    }
  };
  useEffect(() => {
    GetData();
    // console.log("Data :", data);
  }, [userData?.userToken]);
  useEffect(() => {
    const savedata = JSON.parse(localStorage.getItem("advertisementData"));
    if (savedata) {
      setdata(savedata);
    } else {
    }
  }, []);
  // useEffect(() => {
  //   localStorage.setItem("advertisementData", JSON.stringify(data));
  // }, [data]);

  // function Add() {
  //   setdata((currentdata) => {
  //     return [...currentdata, ...inputs];
  //   });
  // }
  const handelmodal = () => {
    return setmodal(true);
  };

  // function Remove() {
  //   localStorage.removeItem("advertisementData");
  // }
  const hidemodal = () => {
    return setmodal(false);
  };
  const AddnewAdvertisement = (newData) => {
    setdata((prevdata) => {
      const updatedata = [...prevdata, newData];
      localStorage.setItem("advertisementData", JSON.stringify(updatedata));
      return updatedata;
    });
  };

  // const FetchDontaion = async () => {
  //   const getRes = await GetDonationAPI(userData?.user?._id, userData?.token);
  //   console.log("GetRes: ", getRes);
  // };

  // useEffect(() => {
  //   FetchDontaion();
  //   console.log("User Data: ", userData);
  // }, []);

  return (
    <div className="p-4  custom-bg">
      <div className="">
        <div className="d-block">
          <div className="d-flex">
            <div>
              <h1 className="text-center Hsize ">Advertisement</h1>
              <p className="subHeader">Subheading</p>
            </div>

            {/* <div>
           {isLoggedIn ? (
              <div className="d-block w-100 d-flex justify-content-end">
                <Button className="BtnAdv" onClick={handelmodal}>
                  Create Advertisement
                </Button>
               
              </div>
            ) : (
              ""
            )}
           </div> */}
          </div>
          <div
            className="row py-5 flex-wrap "
            style={{ paddingRight: "100px" }}
          >
            {data.map((item) => {
              return (
                <AdvertisementCard
                  Name={item.title}
                  // Number={item.Number}
                  Description={item.description}
                  // Image={`${BaseUrl}/${item.image}`}
                />
              );
            })}
          </div>
        </div>

        <AdvertisementModal
          state={modal}
          fun={hidemodal}
          AddnewAdvertisement={AddnewAdvertisement}
        />
      </div>
    </div>
  );
};

export default Advertisement;
