import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Loading from "../../../Components/Loading/Loading";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Link } from "react-router";
const BookReviewSection = () => {
  const { user } = useAuth();

  //FETCH ALL reviews
  const { data, isLoading } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      // const res = await axiosSecure.get("/users");
      const res = await axios.get("http://localhost:3000/reviews/approved");

      return res.data;
    },
  });

  console.log(data, isLoading);
  if (isLoading) return <Loading />;
  return (
    <div className="py-24 relative z-0">
      <h2 className="text-xl md:text-2xl lg:text-5xl font-primary text-light-text  font-bold md:font-extrabold text-center pb-9 md:pb-16 dark:text-dark-text">
        Book Review
      </h2>

      <div className="my-8 md:my-12 px-4">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {data?.map((review) => (
           
            <SwiperSlide key={review._id}>
              <Link to='/all-books-review'>
              <div className="publisher-card bg-light-secondary dark:bg-dark-secondary shadow-md rounded-md flex flex-col items-center p-4 gap-2">
                <div className="flex-1 w-full">
                  <img
                    src={review?.imageUrl}
                    alt={review.name}
                    className="w-20 h-20 md:w-4/12 md:h-36 mx-auto "
                  />
                </div>
                <div>
                  <h2 className="font-secondary text-light-text text-sm md:text-xl lg:text-3xl font-bold py-3 md:pt-6 text-center dark:text-dark-text">
                    {review?.title}
                  </h2>
                  
                  <div className="rtign text-center flex items-center gap-2">
                    <h2 className="font-secondary text-light-text text-sm md:text-xl lg:text-xl font-bold md:mb-2 dark:text-dark-text">
                    Rating
                  </h2>
                    <Rating
                      initialRating={review?.rating}
                      emptySymbol={
                        <FaRegStar className="text-xl text-light-primary" />
                      }
                      fullSymbol={
                        <FaStar className="text-xl text-light-primary" />
                      }
                      fractions={2}
                      readonly
                    />
                  </div>
                   <h2 className="font-secondary text-light-text text-sm md:text-xl lg:text-xl font-bold md:mb-2">
                    By : {review?.reviewerName}
                  </h2>

                </div>
              </div>
              </Link>
            </SwiperSlide>
          
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BookReviewSection;
