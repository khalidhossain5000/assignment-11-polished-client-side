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
    <div className="py-12 lg:py-24 bg-light-background">
      <div className="d-title">
        <Helmet>
          <title>Book-Categories</title>
        </Helmet>
      </div>
      <h1 className="text-xl md:text-2xl lg:text-5xl font-primary text-light-text font-bold md:font-extrabold text-center py-9 md:py-16">
        {name} Categories : {categoryBooks.length}
      </h1>

      <div className="container mx-auto py-12 lg:py-24 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-center px-6 lg:px-0">
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
