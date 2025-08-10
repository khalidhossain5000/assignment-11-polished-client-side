import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { Link } from "react-router";

const AllBooksTable = ({ allBooks, index }) => {
  const { _id, title, imageUrl, quantity, author, category, rating } = allBooks;

  return (
    <tr className="border-b-1 border-b-light-primary border-r-1 text-[17px] font-normal">
      <td className="text-text-light-text dark:text-dark-text">{index + 1}</td>
      <td className="border-x-1 border-x-light-primary text-text-light-text dark:text-dark-text">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask rounded-2xl h-12 w-12 lg:w-20 lg:h-20">
              <img
                className=""
                src={imageUrl}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div></div>
        </div>
      </td>
      <td className="border-x-1 border-x-light-primary  font-primary text-light-text  dark:text-dark-text">
        {title}
      </td>
      <td className="border-x-1 border-x-light-primary text-light-text font-primary  dark:text-dark-text">
        {quantity}
      </td>
      <td className="border-x-1 border-x-light-primary text-light-text font-primary  dark:text-dark-text">
        {author}
      </td>
      <td className="border-x-1 border-x-light-primary text-light-text font-primary dark:text-dark-text">
        {category}
      </td>
      <td className="border-x-1 border-x-light-primary text-light-text font-primary dark:text-dark-text">
        <div className="rtign text-center my-6">
          <Rating
            initialRating={rating}
            emptySymbol={<FaRegStar className="text-3xl text-light-primary" />}
            fullSymbol={<FaStar className="text-3xl text-light-primary" />}
            fractions={2}
            readonly
          />
        </div>
      </td>

      <th>
        <div className="space-y-3">
          <Link
            to={`/update-book/${_id}`}
            // className=" btn btn-warning font-bold text-light-text "
          >
            <button className="bg-light-primary px-3 py-4 md:px-9 md:py-4 rounded-sm font-primary font-semibold font-text-light-text text-md lg:text-xl hover:scale-110 hover:shadow-xl hover:shadow-light-secondary transition duration-300 cursor-pointer text-text-light-text w-fullmx-auto">
              Update
            </button>
          </Link>
        </div>
      </th>
    </tr>
  );
};

export default AllBooksTable;
