import React, { useEffect, useState } from "react";
import AllBooksCard from "./AllBooksCard";
import AllBooksTable from "./AllBooksTable";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Loading from "../../Components/Loading/Loading";

const AllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [BookLoading, setBookLoading] = useState(true);
  const [view, setView] = useState("card");

  const { user,loading } = useAuth();

  useEffect(() => {

    setBookLoading(true);
    if(loading) return <Loading/>

    axios("http://localhost:3000/allBooks", {
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((res) => {
        const data = res.data;
        setAllBooks(data);
        setBookLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setBookLoading(false);
      });
  }, [user?.accessToken,loading]);

  if (BookLoading) return <Loading />;

  const handleFilterBooks = () => {
    const availableBooks = allBooks.filter((books) => books.quantity > 0);
    setAllBooks(availableBooks);
  };
  return (
    <div className="py-12 lg:py-24 relative bg-light-background dark:bg-dark-background">
      <div className="d-title">
        <Helmet>
          <title>All-Books</title>
        </Helmet>
      </div>
     

      <h2 className="text-xl md:text-2xl lg:text-5xl font-primary text-light-text font-bold md:font-extrabold text-center py-9 md:py-16 dark:text-dark-text">
        All Books : {allBooks.length}
      </h2>

      {/* filter sidebar */}
      <section className="z-50">
        <section className="lg:flex items-start filter-container container mx-auto py-6 lg:py-16 gap-6 md:gap-3 lg:gap-6 md:px-2 lg:px-0">
          <div className="lg:w-[20%] self-start bg-light-secondary md:p-2 shadow-xl rounded-md shadow-light-secondary dark:bg-dark-background dark:shadow-dark-secondary">
            <aside className="text-center mt-12 md:p-2 lg:p-0 p-0 dark:bg-dark-secondary ">
              <div className="py-3 md:pb-6 border-b-3 border-b-light-primary">
                <h1 className="text-xl md:text-2xl lg:text-4xl font-primary text-light-text font-bold md:font-extrabold text-center dark:text-dark-text">
                  Filter Options
                </h1>
              </div>
              <div className="filtered pt-6 border-b-2 border-light-primary pb-6 lg:pb-9 md:flex flex-col lg:block md:px-6 lg:px-0 dark:text-dark-text">
                <button
                  onClick={handleFilterBooks}
                  className="bg-light-primary px-3 py-4 md:px-9 md:py-4 rounded-sm font-secondary font-semibold font-light-text text-md lg:text-xl hover:scale-110 hover:shadow-xl hover:shadow-light-secondary transition duration-300 cursor-pointer text-light-text"
                >
                  Show Available Books
                </button>
                {/* select  VIEW*/}
                <select
                  defaultValue="Card View"
                  className="bg-light-primary px-3 py-4 md:px-9 md:py-4 rounded-sm font-secondary font-semibold font-light-text text-md lg:text-xl hover:scale-110 hover:shadow-xl hover:shadow-light-secondary transition duration-300 cursor-pointer text-light-text mt-2 md:mt-3 md:w-10/12 mx-auto"
                  onChange={(e) => setView(e.target.value)}
                >
                  <option className="bg-light-text text-light-background " disabled={true}>
                    Select Books View
                  </option>
                  <option className="bg-light-text text-light-background" value="card">
                    Card View
                  </option>
                  <option className="bg-light-text text-light-background" value="table">
                    Table View
                  </option>
                </select>
              </div>
            </aside>
          </div>

          {/* CARD VIEW CONTAINER  */}
          {view == "card" && (
            <div className="mt-6 lg:mt-0 rounded-md px-2 lg:w-[80%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-9 ">
              {allBooks.map((book) => (
                <AllBooksCard key={book._id} book={book}></AllBooksCard>
              ))}
            </div>
          )}

          {/* TABLE VIEW CONTAINER */}

          {view === "table" && (
            <div className="bg-light-secondary dark:bg-dark-secondary shadow-md rounded-xl mt-6 lg:mt-0 p-6 lg:w-[80%] overflow-x-auto">
              <table className="table border-1 border-light-primary table-auto w-full ">
                {/* head */}
                <thead className="">
                  <tr className="border-b-1 border-b-light-primary text-light-background text-xl font-normal">
                    <th className="dark:text-dark-text font-primary text-light-text">#</th>
                    <th className="dark:text-dark-text border-x-1 border-light-primary font-primary text-light-text">Book Image</th>
                    <th className="border-x-1 border-light-primary font-primary text-light-text dark:text-dark-text">Book Name</th>
                    <th className="border-x-1 border-light-primary font-primary text-light-text dark:text-dark-text">Quantity</th>
                    <th className="border-x-1 border-light-primary font-primary text-light-text dark:text-dark-text">Author</th>
                    <th className="border-x-1 border-light-primary font-primary text-light-text dark:text-dark-text">Category</th>
                    <th className="border-x-1 border-light-primary font-primary text-light-text dark:text-dark-text">Rating</th>
                    <th className="border-x-1 border-light-primary font-primary text-light-text dark:text-dark-text">Actions</th>
                  </tr>
                </thead>
                <tbody className="">
                  {allBooks.map((books, index) => (
                    <AllBooksTable
                      key={index}
                      allBooks={books}
                      index={index}
                    ></AllBooksTable>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>
    </div>
  );
};

export default AllBooks;
