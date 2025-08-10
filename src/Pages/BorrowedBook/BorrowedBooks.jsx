import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import BorrowedBooksCard from "./BorrowedBooksCard";
import { Helmet } from "react-helmet-async";
import Loading from "../../Components/Loading/Loading";

const BorrowedBooks = () => {
  //{borrowBookData.length}
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [borrowLoading,setBorrowLoading]=useState(true)
  const { user } = useAuth();
  
  useEffect(() => {
    setBorrowLoading(true)
    axios(
      `http://localhost:3000/borrowed-books/${user?.email}`,
      {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
        },
      }
    )
      .then((result) => {
        const data = result.data;
        setBorrowedBooks(data);
        setBorrowLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setBorrowLoading(false)
      });
  }, [user]);
  if (borrowLoading) return <Loading />;
  return (
    <div className="py-36 bg-gradient-to-br from-[#c0e3f7] via-[#dfc7ea] to-[#c0e3f7]">
      <div className="d-title">
        <Helmet>
          <title>Borrowed-Books</title>
        </Helmet>
      </div>
      <h1 className="text-6xl font-bold text-[#1F2937] text-center py-6">
        Total Borrowed Books : {borrowedBooks.length}
      </h1>
      <div className="no-mes">
        {
          borrowedBooks.length<=0 && <div><h2 className="text-center py-24 text-3xl font-bold text-black">You Havent Borrowed Any Books Yet!</h2></div>
        }
      </div>
      <div className="py-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 container mx-auto">
        {borrowedBooks.map((book) => (
          <BorrowedBooksCard
            key={book._id}
            book={book}
            DeleteBorrowBook={(deleteId) => {
              const remainingBooks = borrowedBooks.filter(
                (book) => book.bookId !== deleteId
              );
              setBorrowedBooks(remainingBooks);
            }}
          ></BorrowedBooksCard>
        ))}
      </div>
    </div>
  );
};

export default BorrowedBooks;
