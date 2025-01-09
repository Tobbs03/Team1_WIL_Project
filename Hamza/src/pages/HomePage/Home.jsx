import React from "react";
import "./Home.css";
import { Container } from "react-bootstrap";
import WalkingGuyImg from "../../assets/walking-dude.jpg";
const Home = () => {
  return (
    <div className="py-3 Height Home">
      <div className="contentContainer px-3">
        <div className="contentContainer">
          <h1>Home</h1>
          <p className="subHeader">
            Subheading for description or instructions
          </p>
        </div>
      </div>
      <div className="row w-100 px-3">
        <div className="col-md-8  d-flex align-items-center justify-content-center">
          <div className="mt-2 py-auto">
            <p className="content">
              Body text for your whole article or post. We’ll put in some lorem
              ipsum to show how a filled-out page might look
            </p>
            <br />
            <p className="content">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam,
              nulla doloribus? Delectus natus accusamus quae magni, corporis
              harum nisi obcaecati eum eos deserunt sit atque quibusdam dolore.
              Libero, ad provident. Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Quis, nemo sequi quasi voluptates amet nam
              minima, nihil sint provident ratione eaque officiis deleniti,
              doloremque eius veritatis ea! Quisquam, autem placeat.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="py-1 px-1  imageContainer w-100">
            <img src={WalkingGuyImg} alt={"Walking Guy"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
