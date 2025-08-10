import React from "react";
// import ScrollLinked from "../../Components/Motion/ScrollLinked";
// import img1 from "../../assets/BookImg/786aad002_41022.jpg";

import img1 from "../../assets/BookImg/NewArrival/New-Polished/Neuromancer_Sprawl_Trilogy-William_Gibson-img-i.jpg";
import img2 from "../../assets/BookImg/NewArrival/New-Polished/A_Beginners_Guide_To_Data_Science_-Enamul_Haque--com-cat.jpg";
import img3 from "../../assets/BookImg/NewArrival/New-Polished/Famous_Science_Fiction-Book_Club-img-ii.png";
import img4 from "../../assets/BookImg/NewArrival/New-Polished/Schaums_Outline_of_Programming_with_C-Byron_S_.jpg";
import img5 from "../../assets/BookImg/NewArrival/New-Polished/The_Invisible_Man_-H_G_Wells-img-iiii.jpg";
import img6 from "../../assets/BookImg/NewArrival/New-Polished/The_Most_Powerful_Success_Series.jpg";
import img7 from "../../assets/BookImg/NewArrival/New-Polished/as-a-man-motiv-dev-books.jpg";

// import Swiper core and required modules
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
const NewArrivals = () => {
  return (
    <div className="bg-light-secondary dark:bg-dark-secondary py-12 lg:py-24 border-t border-t-light-primary dark:border-t-dark-secondary">
      <h1 className="text-xl md:text-2xl lg:text-5xl font-primary text-light-text font-bold md:font-extrabold text-center pb-3 dark:text-dark-text">
        New Arrivals
      </h1>

      <h5 className="dark:text-dark-text text-xl md:text-2xl font-secondary font-semibold text-light-text text-center py-3 mb-6 lg:mb-12">
        Check out the newest books just added to our library!
      </h5>
      <div className="container mx-auto py-12 md:pt-22">
        <Swiper
          modules={[Autoplay, Pagination, EffectCoverflow]}
          effect="coverflow"
          centeredSlides={true}
          initialSlide={2}
          speed={600}
          coverflowEffect={{
            rotate: 0,
            stretch: 80,
            depth: 350,
            modifier: 1,
            slideShadows: false,
          }}
          grabCursor={true}
          spaceBetween={80}
          slidesPerView={3}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 2000 }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        >
          {/* slider -1 */}
          <SwiperSlide>
            <div className="relative p-6 lg:p-12 shadow-2xl rounded-md text-center flex flex-col items-center space-y-12 bg-gradient-to-bl from-light-background to-light-secondary ">
              <div className="shadow-xl rounded-xl ">
                <img className="w-56 p-2" src={img1} alt="" />
              </div>
              <div className="content">
                <h3 className="font-primary text-xl md:text-2xl font-semibold text-light-text  text-center dark:text-dark-text">
                  Neuromancer (Sprawl Trilogy)
                </h3>
                <h5 className=" lg:text-[18px] pt-3 font-medium dark:text-dark-text">
                  By
                  <span className="ml-2 font-secondary font-bold text-light-text dark:text-dark-text">
                    William Gibson
                  </span>
                </h5>
              </div>
            </div>
          </SwiperSlide>
          {/* slider -2 */}
          <SwiperSlide>
            <div className="relative p-6 lg:p-12 shadow-2xl rounded-md text-center flex flex-col items-center space-y-12 bg-gradient-to-bl from-light-background to-light-secondary">
              <div className="shadow-xl rounded-xl ">
                <img className="w-56 p-2" src={img2} alt="" />
              </div>
              <div className="content">
                <h3 className="font-primary text-xl md:text-2xl font-semibold text-light-text  text-center dark:text-dark-text">
                  A Beginner's Guide To Data Science
                </h3>
                <h5 className=" lg:text-[18px] pt-3 font-medium dark:text-dark-text">
                  By
                  <span className="ml-2 font-secondary font-bold text-light-text dark:text-dark-text">
                    Enamul Haque
                  </span>
                </h5>
              </div>
            </div>
          </SwiperSlide>          
        {/* slider -3 */}
          <SwiperSlide>
            <div className="relative p-6 lg:p-12 shadow-2xl rounded-md text-center flex flex-col items-center space-y-12 bg-gradient-to-bl from-light-background to-light-secondary">
              <div className="shadow-xl rounded-xl ">
                <img className="w-56 p-2" src={img3} alt="" />
              </div>
              <div className="content">
                <h3 className="font-primary text-xl md:text-2xl font-semibold text-light-text  text-center dark:text-dark-text">
                  Famous Science Fiction
                </h3>
                <h5 className="lg:text-[18px] pt-3 font-medium dark:text-dark-text">
                  By
                  <span className="ml-2 font-secondary dark:text-dark-text font-bold text-light-text">
                    Book Club
                  </span>
                </h5>
              </div>
            </div>
          </SwiperSlide>        
          {/* slider -4*/}
          <SwiperSlide>
            <div className="relative p-6 lg:p-12 shadow-2xl rounded-md text-center flex flex-col items-center space-y-12 bg-gradient-to-bl from-light-background to-light-secondary">
              <div className="shadow-xl rounded-xl ">
                <img className="w-56 p-2" src={img4} alt="" />
              </div>
              <div className="content">
                <h3 className="font-primary dark:text-dark-text text-xl md:text-2xl font-semibold text-light-text  text-center">
                  Schaum's Outline of Programming with C
                </h3>
                <h5 className="lg:text-[18px] pt-3 font-medium dark:text-dark-text">
                  By
                  <span className="ml-2 font-secondary font-bold dark:text-dark-text text-light-text">
                    Byron S. Gottfried
                  </span>
                </h5>
              </div>
            </div>
          </SwiperSlide>          
        {/* slider -5*/}
          <SwiperSlide>
            <div className="relative p-6 lg:p-12 shadow-2xl rounded-md text-center flex flex-col items-center space-y-12 bg-gradient-to-bl from-light-background to-light-secondary">
              <div className="shadow-xl rounded-xl ">
                <img className="w-56 p-2" src={img5} alt="" />
              </div>
              <div className="content">
                <h3 className="font-primary text-xl md:text-2xl font-semibold text-light-text  text-center dark:text-dark-text">
                  The Invisible Man
                </h3>
                <h5 className=" lg:text-[18px] pt-3 font-medium dark:text-dark-text">
                  By
                  <span className="ml-2 font-secondary font-bold dark:text-dark-text text-light-text">
                    H. G. Wells
                  </span>
                </h5>
              </div>
            </div>
          </SwiperSlide>       
         {/* slider -6*/}
          <SwiperSlide>
            <div className="relative p-6 lg:p-12 shadow-2xl rounded-md text-center flex flex-col items-center space-y-12 bg-gradient-to-bl from-light-background to-light-secondary">
              <div className="shadow-xl rounded-xl ">
                <img className="w-56 p-2" src={img6} alt="" />
              </div>
              <div className="content">
                <h3 className="font-primary text-xl md:text-2xl font-semibold text-light-text  text-center dark:text-dark-text">
                  The Most Powerful Success Series
                </h3>
                <h5 className="lg:text-[18px] pt-3 font-medium dark:text-dark-text">
                  By
                  <span className="ml-2 font-secondary text-light-text dark:text-dark-text">
                    Dale Carnegie
                  </span>
                </h5>
              </div>
            </div>
          </SwiperSlide>         
        {/* slider -7*/}
          <SwiperSlide>
            <div className="relative p-6 lg:p-12 shadow-2xl rounded-md text-center flex flex-col items-center space-y-12 bg-gradient-to-bl from-light-background to-light-secondary">
              <div className="shadow-xl rounded-xl ">
                <img className="w-56 p-2" src={img7} alt="" />
              </div>
              <div className="content">
                <h3 className=" font-primary text-xl md:text-2xl font-semibold text-light-text  text-center dark:text-dark-text">
                  As A Man Thinketh
                </h3>
                <h5 className="lg:text-[18px] pt-3 font-medium dark:text-dark-text">
                  By
                  <span className="ml-2 font-secondary font-bold text-light-text dark:text-dark-text">
                    James Allen
                  </span>
                </h5>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default NewArrivals;
