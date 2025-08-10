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
    rating,
    author,
    quantity,
    category,
    returnDate,
    _id,
  } = book;

  const { user } = useAuth();

  const handleReturnBook = (bookId) => {
    //UPDATE QUANTITY API
    axios
      .patch(
        `http://localhost:3000/all-books/quantity/${bookId}`,
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
        `http://localhost:3000/borrowed-books/${_id}`,
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
            customClass:{
              popup:'gradient-bg'
            }
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
     
      <div className="h-full p-3 rounded-2xl shadow-2xl bg-gradient-to-br from-[#fee8f7] via-[#f1e6fd] to-[#e0d4ff]">
        <div className="p-2 rounded-xl mx-auto shadow-xl shadow-cyan-200 " >
      <img className="w-56 h-56 mx-auto " src={imageUrl} alt="" />
      </div>
        <div className="cntent space-y-6 mt-3 lg:mt-8 p-2" >
          <h1 className="text-2xl font-bold text-black">{title}</h1>
        <h2 className="font-bold text-2xl text-black ">
          Return Date: <span className="text-xl font-bold text-cyan-700">{returnDate}</span>
        </h2>
        <h3 className="font-bold text-black">Quantity : <span className="text-xl lg:text-[17px] font-bold text-cyan-700">{quantity}</span> </h3>
      <h3 className="font-bold text-black">Author : <span className=" font-bold text-cyan-700">{author}</span></h3>
      <h3 className="font-bold text-black">Category :<span className="font-bold text-cyan-700">{category}</span> </h3>
        </div>

        <div className="rtign my-3 flex items-center gap-3">
          <span className="text-xl font-bold text-black ">Rating:</span>
          <Rating
            initialRating={rating}
            emptySymbol={<FaRegStar className="text-3xl text-yellow-400" />}
            fullSymbol={<FaStar className="text-3xl text-yellow-500" />}
            fractions={2}
            readonly
          />
        </div>
        
        <div className="mt-6 ">
          <button
            onClick={() => handleReturnBook(bookId)}
            // className="btn btn-xl btn-warning text-2xl font-bold text-black m-6"
            className="bg-gradient-to-tr from-[#C3DDFD] to-[#FFF9C4] text-[#0A0A23] font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 w-full cursor-pointer"
          >
            Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default BorrowedBooksCard;
