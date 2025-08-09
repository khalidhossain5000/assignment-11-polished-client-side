import React from "react";
import { useLoaderData, useParams } from "react-router";
import CategoryCard from "./CategoryCard";
import { Helmet } from "react-helmet-async";

const BookCategory = () => {
  const { name } = useParams();
  const allBooks = useLoaderData();

  const categoryBooks = allBooks.filter(
    (book) => book?.category?.toLowerCase() === name
  );

  return (
    <div className="py-12 lg:py-24 bg-gradient-to-br from-[#c0e3f7] via-[#dfc7ea] to-[#c0e3f7]">
      <div className="d-title">
        <Helmet>
          <title>Book-Categories</title>
        </Helmet>
      </div>
      <h1 className="mb-6 lg:mb-16 text-3xl md:text-6xl font-bold text-center text-[#1F2937]">
        {name} Categories : {categoryBooks.length}
      </h1>

      <div className="container mx-auto py-12 lg:py-24 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center items-center px-6 lg:px-0">
        {categoryBooks.map((singleBook) => (
          <CategoryCard
            singleBook={singleBook}
            key={singleBook._id}
          ></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default BookCategory;
