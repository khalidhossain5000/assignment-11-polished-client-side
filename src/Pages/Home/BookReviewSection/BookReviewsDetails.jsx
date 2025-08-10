import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../Components/Loading/Loading";
import { Helmet } from "react-helmet-async";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";

const BookReviewsDetails = () => {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const { user, loading } = useAuth();
  //data loading use effect starts here
  useEffect(() => {
    setDetailsLoading(true);
    if (loading) return <Loading />;
    axios(
      `https://assignment-11-polished-server-side.vercel.app/review-details/${id}`,
      {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
        },
      }
    )
      .then((res) => {
        const data = res.data;
        setBooks(data);
        setDetailsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setDetailsLoading(false);
      });
  }, [id, user?.accessToken, loading]);
  if (detailsLoading) return <Loading />;
  console.log(books);
  return (
    <div className="py-12 lg:py-24 bg-light-background ">
      <div className="d-title">
        <Helmet>
          <title>Book-Details</title>
        </Helmet>
      </div>

      <div className="container mx-auto py-24 lg:flex justify-center gap-12 shadow-xl shadow-light-secondary border-1 border-light-secondary rounded-md">
        <div className="imgs rounded-sm p-5 !h-full border-1 border-light-primary">
          <img
            className="hover:scale-105 hover:saturate-150 cursor-pointer transition duration-300 lg:w-96 mx-auto w-56"
            src={books?.imageUrl}
            alt=""
          />
        </div>

        <div className="contnt w-full space-y-2">
          <h1 className="font-secondary text-light-text text-sm md:text-xl lg:text-3xl font-bold">
            Book Name: {books?.title}
          </h1>
          <h2 className="font-secondary text-light-text text-sm md:text-xl font-bold">
            By :{" "}
            <span className="text-light-primary font-extrabold font-primary">
              {books?.author}
            </span>
          </h2>
          <h2 className="font-secondary text-light-text text-sm md:text-xl font-semibold">
            Category :{" "}
            <span className="text-light-primary font-primary font-extrabold">
              {books?.category}
            </span>
          </h2>

          <div className="rtign lg:py-3 flex flex-col md:flex-row gap-3 items-center">
            <h2 className="font-secondary text-light-text text-sm md:text-2xl font-semibold">
              Rating :
            </h2>
            <Rating
              initialRating={books?.rating}
              emptySymbol={<FaRegStar className="text-xl text-light-text" />}
              fullSymbol={<FaStar className="text-xl text-light-primary" />}
              fractions={2}
              readonly
            />
          </div>
          <p className="py-2 md:py-4 font-secondary text-light-text text-sm lg:text-xl ">
            <span className="font-secondary text-light-text text-sm md:text-xl lg:text-2xl font-bold">
              Review Details:
            </span>{" "}
            : {books?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookReviewsDetails;
