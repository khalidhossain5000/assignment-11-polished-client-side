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
    <div className="py-12 md:py-24 bg-light-background">
      <div className="d-title">
        <Helmet>
          <title>Borrowed-Books</title>
        </Helmet>
      </div>
      <h1 className="text-xl md:text-2xl lg:text-5xl font-primary text-light-text font-bold md:font-extrabold text-center pb-9 md:py-16">
        Total Borrowed Books : {borrowedBooks.length}
      </h1>
      <div className="no-mes">
        {
          borrowedBooks.length<=0 && <div><h2 className="text-center py-24 text-xl lg:text-3xl font-bold text-light-text">You Havent Borrowed Any Books Yet!</h2></div>
        }
      </div>
      <div className="py-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 container mx-auto">
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
