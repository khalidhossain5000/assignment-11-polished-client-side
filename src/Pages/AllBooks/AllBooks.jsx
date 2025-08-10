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
    <div className="py-12 lg:py-24 relative border-t border-t-blue-300">
      <div className="d-title">
        <Helmet>
          <title>All-Books</title>
        </Helmet>
      </div>
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>

      <h2 className=" text-6xl font-bold text-center text-[#1F2937]">
        All Books : {allBooks.length}
      </h2>

      {/* filter sidebar */}
      <section className="z-50">
        <section className="lg:flex items-start filter-container container mx-auto py-12 lg:py-24 gap-6 md:gap-3 lg:gap-6 md:px-2 lg:px-0">
          <div className="lg:w-[20%] self-start bg-[#ffffff] shadow-2xl rounded-4xl">
            <aside className="text-center mt-12 md:p-2 lg:p-0 p-0">
              <div className="py-3 md:pb-6 border-b-3 border-b-gray-300">
                <h1 className="text-xl lg:text-3xl font-bold text-[#1f2937">
                  Filter Options
                </h1>
              </div>
              <div className="filtered pt-6 border-b-2 border-blue-100 pb-6 lg:pb-9 md:flex flex-col lg:block md:px-6 lg:px-0">
                <button
                  onClick={handleFilterBooks}
                  className="btn bg-gradient-to-tr from-[#C3DDFD] to-[#FFF9C4] hover:from-[#d6f0ff] hover:to-[#dbcdff] hover:text-black py-4 lg:py-6 rounded-xl shadow-xl btn-bold lg:text-xl text-black"
                >
                  Show Available Books
                </button>
                {/* select  VIEW*/}
                <select
                  defaultValue="Card View"
                  className="bg-gradient-to-tr from-[#C3DDFD] to-[#FFF9C4] p-2 border border-pink-100 rounded-xl shadow-xl btn-bold lg:text-xl text-black mt-6 md:w-full lg:w-9/12 font-bold"
                  onChange={(e) => setView(e.target.value)}
                >
                  <option className="bg-cyan-800 text-white" disabled={true}>
                    Select Books View
                  </option>
                  <option className="bg-cyan-800 text-white" value="card">
                    Card View
                  </option>
                  <option className="bg-cyan-800 text-white" value="table">
                    Table View
                  </option>
                </select>
              </div>
            </aside>
          </div>

          {/* CARD VIEW CONTAINER  */}
          {view == "card" && (
            <div className="mt-6 lg:mt-0 shadow-sm rounded-md px-2 lg:w-[80%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 ">
              {allBooks.map((book) => (
                <AllBooksCard key={book._id} book={book}></AllBooksCard>
              ))}
            </div>
          )}

          {/* TABLE VIEW CONTAINER */}

          {view === "table" && (
            <div className="bg-gradient-to-br from-[#fee8f7] via-[#f1e6fd] to-[#e0d4ff] shadow-2xl rounded-xl mt-6 lg:mt-0 p-6 lg:w-[80%] overflow-x-auto">
              <table className="table border-1 border-cyan-600 table-auto w-full ">
                {/* head */}
                <thead className="">
                  <tr className="border-b-1 border-b-cyan-600 text-black text-xl font-normal">
                    <th className="">#</th>
                    <th className="border-x-1 border-x-cyan-300">Book Image</th>
                    <th className="border-x-1 border-x-cyan-300">Book Name</th>
                    <th className="border-x-1 border-x-cyan-300">Author</th>
                    <th className="border-x-1 border-x-cyan-300">Category</th>
                    <th className="border-x-1 border-x-cyan-300">Quantity</th>
                    <th className="border-x-1 border-x-cyan-300">Rating</th>
                    <th className="border-x-1 border-x-cyan-300">Actions</th>
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
