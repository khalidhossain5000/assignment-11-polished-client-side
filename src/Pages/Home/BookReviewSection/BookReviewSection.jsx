import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Loading from "../../../Components/Loading/Loading";
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
    enabled: !!user?.email,    
  });

  console.log(data,isLoading);
  if (isLoading) return <Loading />;
  return (
    <div className="py-24 relative z-0">
      <h2 className="text-center text-3xl font-bold py-12">All Publishers</h2>

      <div className="my-8 px-4">
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
              <div className="publisher-card bg-white shadow-md rounded-lg flex flex-col items-center p-4 gap-2">
                <img
                  src={review?.imageUrl}
                  alt={review.name}
                  className="w-20 h-20 object-contain"
                />
                <h2 className="text-center font-semibold">{review?.title}</h2>
                <h2 className="text-center font-semibold">{review?.rating}</h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BookReviewSection;
