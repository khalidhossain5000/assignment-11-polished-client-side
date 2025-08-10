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
    author,
    category,
    rating,
    _id,

  } = book;


  return (
    <div className="flex flex-col justify-between h-full p-3 rounded-2xl shadow-2xl bg-gradient-to-br from-[#fee8f7] via-[#f1e6fd] to-[#e0d4ff]">

      <div className="imgs  p-2 shadow-xl shadow-cyan-200 rounded-xl">
        <img className="w-56 h-56 mx-auto" src={imageUrl} alt="" />
      </div>

      <div className="cntstn py-3 lg:p-3 space-y-3 mt-3 lg:mt-6">
        <h1 className="text-2xl font-bold text-black">{title}</h1>
        <h3 className="font-bold text-black">
          Quantity :{" "}
          <span className="text-2xl font-bold text-cyan-700">{quantity}</span>{" "}
        </h3>
        <h3 className="font-semibold text-black">
          Author : <span className=" font-bold text-cyan-700">{author}</span>
        </h3>
        <h3 className="font-semibold text-black">
          Category :<span className="font-bold text-cyan-700">{category}</span>{" "}
        </h3>
      </div>

      <div className="text-center py-3 lg:py-6 mt-auto rtign space-y-6 lg:space-y-12">
        <Rating
          initialRating={rating}
          emptySymbol={<FaRegStar className="text-3xl text-yellow-400" />}
          fullSymbol={<FaStar className="text-3xl text-yellow-500" />}
          fractions={2}
          readonly
        />

        {
          user?.email && <Link
          to={`/update-book/${_id}`}
          className="block lg:inline bg-gradient-to-tr from-[#C3DDFD] to-[#FFF9C4] hover:from-[#d6f0ff] hover:to-[#dbcdff] hover:text-black text-xl text-black font-bold py-3 px-6 rounded-md shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          Update
        </Link>
        }
      </div>
    </div>
  );
};

export default AllBooksCard;
