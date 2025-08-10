import React from "react";
import { Link } from "react-router";
import compImg from "../../assets/HomeCategorieImg/com&programming.jpg";
import scifiImg from "../../assets/HomeCategorieImg/science-fictions.jpg";
import sportsImg from "../../assets/HomeCategorieImg/sports&games.jpg";
import selfdevImg from "../../assets/HomeCategorieImg/Self-Development & Meditation.jpg";
const BookCategories = () => {
  const categories = [
    { name: "Computer & Coding", image: compImg,des:'Learn programming languages, software development, and the fundamentals of computer science to boost your tech skills.' },
    { name: "Science-Fiction", image: scifiImg, des:'Stories blending imagination and science—future technologies, space travel, and mysterious life forms.' },
    { name: "Sports & Games", image: sportsImg ,des:'From football to cricket, indoor games to eSports—news, tips, and tricks from the world of sports and gaming.'},
    { name: "Self-Development", image: selfdevImg,des:'Inspiration and meditation techniques to improve yourself, find mental peace, and maintain life balance.' },
  ];

  return (
    <div className="container mx-auto py-12 md:py-24">
      <h1 className="text-xl md:text-2xl lg:text-5xl font-primary text-light-text font-bold md:font-extrabold text-center pb-9 md:pb-16">Book Categorites</h1>

      <div className="py-3 md:py-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {
          categories.map((cat,i)=><div 
          key={i}
          className="shadow-2xl h-full flex flex-col justify-between pb-3 md:pb-6">
              <div className="igms rounded-t-xl w-full">
                <img src={cat.image} className="h-full rounded-t-xl w-full" alt="" />
              </div>
              <div className="contetns p-2 md:p-5">
                <h2 className="font-secondary text-light-text text-sm md:text-xl lg:text-3xl font-bold">{cat.name}</h2>
                <p className="py-2 md:py-4 font-secondary text-light-text text-sm lg:text-xl ">{cat.des}</p>
              </div>
              <div className="text-center">
                <Link to={`/book-categories/${cat.name.toLocaleLowerCase()}`}>
                  <button className="cursor-pointer hover:scale-105 hover:border-b-light-primary transition duration-300 text-sm md:text-xl lg:text-2xl text-center font-secondary text-light-text font-bold border-b-2 border-b-light-secondary">See More</button>
                </Link>
              </div>
            </div>

          )
        }
      </div>
    </div>
  );
};
{/* <button className="bg-light-primary px-3 py-4 md:px-12 md:py-4 rounded-md font-secondary font-semibold font-light-text text-md lg:text-xl hover:scale-110 hover:shadow-xl hover:shadow-light-secondary transition duration-300 cursor-pointer">Read More</button> */}
export default BookCategories;
