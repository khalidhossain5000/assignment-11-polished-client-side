import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Rating from "react-rating";
import Loading from "../../Components/Loading/Loading";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Link } from "react-router";

const AllBooksReview = () => {
  const { user } = useAuth();

  //FETCH ALL reviews
  const { data, isLoading } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      // const res = await axiosSecure.get("/users");
      const res = await axios.get("http://localhost:3000/reviews/approved");

      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(data, isLoading);
  if (isLoading) return <Loading />;
  return (
    <div className="bg-light-background dark:bg-dark-background py-12 md:py-24">
      <h2 className="text-xl md:text-2xl lg:text-5xl font-primary text-light-text dark:text-dark-text font-bold md:font-extrabold text-center py-9 md:py-16">
        All Books Review
      </h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-9">
        {data.map((review) => (
          <div className="flex flex-col justify-between h-auto rounded-md shadow-xl bg-light-secondary dark:bg-dark-secondary dark:shadow-dark-background shadow-light-secondary pb-6">
            <div className="imgs">
              <img
                className="w-56 h-56 lg:w-9/12 p-3 md:p-3  mx-auto"
                src={review?.imageUrl}
                alt=""
              />
            </div>

            <div className="cntstn space-y-3  text-center">
              <h1 className="pt-2 md:pt-5 font-secondary text-light-text text-sm md:text-xl lg:text-2xl font-bold dark:text-dark-text">
                {review?.title}
              </h1>

              <h3 className="pt-2 dark:text-dark-text  font-primary text-light-text text-sm md:text-xl font-bold">
                Author :<span>{review?.author}</span>{" "}
              </h3>
              <h3 className="pt-2 dark:text-dark-text font-primary text-light-text text-sm md:text-xl font-bold">
                Category :<span>{review?.category}</span>{" "}
              </h3>

              <div className="text-center py-3 lg:py-6 mt-auto rtign flex flex-col md:flex-row items-center  justify-center">
             <h2 className=" dark:text-dark-text font-secondary text-light-text text-sm md:text-2xl font-semibold">
            Rating :
          </h2>
                <div className="lg:pt-2 pl-2">
                  <Rating
                  initialRating={review?.rating}
                  emptySymbol={
                    <FaRegStar className="text-2xl text-light-text" />
                  }
                  fullSymbol={
                    <FaStar className="text-2xl text-light-primary" />
                  }
                  fractions={2}
                  readonly
                />
                </div>



                
              </div>

              <Link to={`/book-review-details/${review?._id}`}>
                   <button className="bg-light-primary px-3 py-4 md:px-9 md:py-4 rounded-sm font-secondary font-semibold font-light-text text-md lg:text-xl hover:scale-110 hover:shadow-xl hover:shadow-light-secondary transition duration-300 cursor-pointer text-light-text">
                Details
              </button> 
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooksReview;
