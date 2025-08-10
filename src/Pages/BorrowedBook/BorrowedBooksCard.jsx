import axios from "axios";
import Swal from "sweetalert2";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";

const BorrowedBooksCard = ({ book, DeleteBorrowBook }) => {
  const {
    bookId,
    title,
    imageUrl,
    // rating,
    author,
    quantity,
    // category,
    returnDate,
    _id,
  } = book;

  const { user } = useAuth();

  const handleReturnBook = (bookId) => {
    //UPDATE QUANTITY API
    axios
      .patch(
        `https://assignment-11-polished-server-side.vercel.app/all-books/quantity/${bookId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        }
      )
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });

    //DELETE BORROW BOOK API
    axios
      .delete(
        `https://assignment-11-polished-server-side.vercel.app/borrowed-books/${_id}`,
        {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        }
      )
      .then((res) => {
        const data = res.data;
        if (data.deletedCount) {
          Swal.fire({
            title: "Book Returned!",
            text: "You Returned The Book SuccessFully!Thanks",
            icon: "success",
            theme: "dark",
            customClass: {
              popup: "gradient-bg",
            },
          });
          DeleteBorrowBook(bookId);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-between h-auto rounded-md shadow-xl bg-light-secondary shadow-light-secondary">
        <div className="imgs">
          <img className="w-56 h-56 lg:w-full mx-auto" src={imageUrl} alt="" />
        </div>

        <div className="cntstn space-y-3  text-center md:text-left p-3 md:-5">
          <h1 className="pt-2 md:pt-5 font-secondary text-light-text text-sm md:text-xl lg:text-2xl font-bold">
            {title}
          </h1>

          <h3 className="pt-2  font-primary text-light-text text-sm md:text-xl font-bold">
            Quantity :<span>{quantity ? quantity : 0}</span>{" "}
          </h3>

          <h3 className="pt-2  font-primary text-light-text text-sm md:text-xl font-bold">
            Return Data :{returnDate}
          </h3>
          <h3 className="pt-2  font-primary text-light-text text-sm md:text-xl font-bold">
            Author :{author}
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

          <div className="mt-6 ">
            <button
              onClick={() => handleReturnBook(bookId)}
              // className="btn btn-xl btn-warning text-2xl font-bold text-black m-6"
              className="bg-light-primary px-3 py-4 md:px-9 md:py-4 rounded-sm font-primary font-semibold font-light-text text-md lg:text-xl hover:scale-110 hover:shadow-xl hover:shadow-light-secondary transition duration-300 cursor-pointer text-light-text w-9/12 mx-auto"
            >
              Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowedBooksCard;
