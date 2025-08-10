import React from "react";
import { Link } from "react-router";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
const AllBooksCard = ({ book }) => {
  const {user}=useAuth()
  const {
    title,
    imageUrl,
    quantity,
    // author,
    // category,
    // rating,
    _id,

  } = book;


  return (
    <div className="flex flex-col justify-between h-auto rounded-md shadow-xl bg-light-secondary shadow-light-secondary">

      <div className="imgs">
        <img className="w-56 h-56 lg:w-full mx-auto" src={imageUrl} alt="" />
      </div>

      <div className="cntstn space-y-3  text-center">

        <h1 className="pt-2 md:pt-5 font-secondary text-light-text text-sm md:text-xl lg:text-2xl font-bold">{title}</h1>

        <h3 className="pt-2  font-primary text-light-text text-sm md:text-xl font-bold">
          Quantity :
          <span >{quantity ? quantity : 0}</span>{" "}
        </h3>
        
      </div>

      <div className="text-center py-3 lg:py-6 mt-auto rtign space-y-6 lg:space-y-12">
        {/* <Rating
          initialRating={rating}
          emptySymbol={<FaRegStar className="text-3xl text-yellow-400" />}
          fullSymbol={<FaStar className="text-3xl text-yellow-500" />}
          fractions={2}
          readonly
        /> */}

        {
          user?.email && <Link
          to={`/update-book/${_id}`}
          
        >
         <button className="bg-light-primary px-3 py-4 md:px-9 md:py-4 rounded-sm font-primary font-semibold font-light-text text-md lg:text-xl hover:scale-110 hover:shadow-xl hover:shadow-light-secondary transition duration-300 cursor-pointer text-light-text">Update Book</button>
        </Link>
        }
      </div>
      
    </div>
  );
};

export default AllBooksCard;
