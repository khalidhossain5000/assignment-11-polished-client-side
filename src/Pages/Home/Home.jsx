import React from "react";
import Slider from "../../Components/Slider/Slider";
import BookCategories from "./BookCategories";

import Testimonial from "../../Components/Testimonial/Testimonial";

import NewArrivals from "../../Components/NewArrivalSection/NewArrivals";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <div className="d-title">
        <Helmet>
          <title> Home</title>
        </Helmet>
      </div>

      <Slider></Slider>
      <BookCategories></BookCategories>
      <NewArrivals />
      <h3 className=" text-3xl text-center font-bold py-24 ">
        This is testing Color theme as shdgo
      </h3>
      <Testimonial></Testimonial>
    </div>
  );
};

export default Home;
