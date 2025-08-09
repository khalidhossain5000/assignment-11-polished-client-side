import React from "react";

import sliderImg1 from "../../assets/SliderImg/slider-i.jpg";
import sliderImg2 from "../../assets/SliderImg/slider-ii.jpg";
import sliderImg3 from "../../assets/SliderImg/slider-iii.jpg";

// import Swiper core and required modules
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
const Slider = () => {
  return (
    <div className="">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{ delay: 5000 }}
      >
        {/* slider -1 lg:h-[calc(100vh)] */}
        <SwiperSlide>
          <div className="relative h-[100vh] lg:h-[98vh]  w-full">
            <img
              className="w-full h-[100vh] lg:h-[98vh]  "
              src={sliderImg1}
              alt=""
            />
            {/* text and black overlay */}
            <div className="absolute inset-0 bg-[#00000090] flex flex-col justify-center items-center text-center p-6">
              <h2 className="font-primary text-2xl md:text-4xl lg:text-7xl font-bold text-light-background">
                Empower Your Library Experience
              </h2>

              <h5 className="font-primary text-xl md:text-2xl font-semibold text-light-background w-full lg:w-6/12 mx-auto mt-5">
                Seamless tools to organize, track, and manage your library
                resources with ease.
              </h5>
            </div>
          </div>
        </SwiperSlide>
        {/* slider - 2 */}
        <SwiperSlide>
          <div className="relative h-[100vh] lg:h-[98vh]  w-full">
            <img
              className="w-full h-[100vh] lg:h-[98vh] "
              src={sliderImg2}
              alt=""
            />
            {/* text and black overlay */}
            <div className="absolute inset-0 bg-[#00000090] flex flex-col justify-center items-center text-center p-6">
              <h2 className="font-primary text-2xl md:text-4xl lg:text-7xl font-bold text-light-background">
                Simplify Library Management Like Never Before
              </h2>

              <h5 className="font-primary text-xl md:text-2xl font-semibold text-light-background w-full lg:w-6/12 mx-auto mt-5">
                Efficient book management, quick access, and smart reporting at
                your fingertips.
              </h5>
            </div>
          </div>
        </SwiperSlide>
        {/* slider - 3 */}
        <SwiperSlide>
          <div className="relative h-[100vh] lg:h-[98vh] w-full">
            <img
              className="w-full h-[100vh] lg:h-[98vh] "
              src={sliderImg3}
              alt=""
            />
            {/* text and black overlay */}
            <div className="absolute inset-0 bg-[#00000090] flex flex-col justify-center items-center text-center p-6">
              <h2 className="font-primary text-2xl md:text-4xl lg:text-7xl font-bold text-light-background">
                Smart Solutions for Modern Libraries
              </h2>

              <h5 className="font-primary text-xl md:text-2xl font-semibold text-light-background w-full lg:w-6/12 mx-auto mt-5">
                Designed to help libraries grow smarter and serve communities better.
              </h5>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
