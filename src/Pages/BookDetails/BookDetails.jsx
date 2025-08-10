import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Modal from "react-modal";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import Loading from "../../Components/Loading/Loading";

const BookDetails = () => {

  const { id } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [returnDate, setReturnDate] = useState(null);
  const [detailsLoading,setDetailsLoading]=useState(true)
  const { user,loading } = useAuth();
  //data loading use effect starts here
  useEffect(() => {
    setDetailsLoading(true)
    if(loading) return <Loading/>
    axios(`http://localhost:3000/allBooks/${id}`, {
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((res) => {
        const data = res.data;
        setBooks(data);
        setDetailsLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setDetailsLoading(false)
      });
  }, [id,user?.accessToken,loading]);
  //data loading use effect ends
  if(detailsLoading) return <Loading/>
  // MODAL RELATED FUNC
  const openModal = () => {
    setModalIsOpen(true);
  };
  //after modal opne later if needed

  const closeModal = () => {
    setModalIsOpen(false);
  };
  Modal.setAppElement('#root');
  // MODAL RELATED FUNC ENDS

  const {
    _id,
    title,
    imageUrl,
    quantity,
    content,
    rating,
    description,
    category,
    author,
  } = books;

  const handleBorrowBook = () => {
    const borrowBook = {
      bookId: _id,
      userEmail: user?.email,
      returnDate: returnDate,
    };
    if (!returnDate) {
      Swal.fire({
        icon: "error",
        title: "Please Select A Return Date",
        text: "You must need to select a return date to borrow a book .",
        theme: "dark",
      });
      return;
    }

    //SAVE BORROW BOOK IN TO THE DB
    axios
      .post(
        `https://assignment-11-server-five-lake.vercel.app/borrow-books/${_id}`,
        borrowBook,
        {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        }
      )
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Book is Added To BorrowBook List.", {
            className: "w-[300px] h-[100px] text-xl font-bold z-[999]",
            removeDelay: 1000,
            iconTheme: {
              primary: "#16061e",
              secondary: "#ef54e2",
            },
            style: {
              border: "1px solid black",
              color: "white",
              backgroundImage: "linear-gradient(to bottom right, #31c3df, #3a47d5)"
            },
          });
        }
        setBooks((prev) => {
          return { ...prev, quantity: prev.quantity - 1 };
        });
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Book is already Borrowed!",
            text: "You have already borrowed this book. Return it first to borrow again.",
            theme: "dark",
            customClass:{
              popup:'error-gradient-bg'
            }
          });
        } else {
          console.log("Borrow error occurred");
        }
        
      });
  };
  
  return (
    <div className="py-12 lg:py-24 bg-gradient-to-br from-[#c0e3f7] via-[#dfc7ea] to-[#c0e3f7] ">
      <div className="d-title">
        <Helmet>
          <title>Book-Details</title>
        </Helmet>
      </div>
      
      <h2 className="text-3xl md:text-6xl font-bold text-[#1F2937] text-center py-6">
        Book Details of : {title}
      </h2>

      <div className="container mx-auto py-24 lg:flex justify-center gap-12">
        <div className="imgs rounded-2xl p-6 !h-full shadow-xl shadow-cyan-500">
          <img className="lg:w-96 mx-auto w-56" src={imageUrl} alt="" />
        </div>

        <div className="contnt shadow-xl shadow-cyan-500 rounded-2xl  p-9 w-full space-y-2">
          <h1 className="text-3xl font-bold text-[#1f2937]">{title}</h1>
          <h2 className="text-xl font-semibold text-[#1f2937] py-6">
            By : {author}
          </h2>
          <h2 className="text-xl font-semibold text-[#1f2937] lg:py-3">
            Category : {category}
          </h2>
          <div className="rtign lg:py-3">
            <Rating
              initialRating={rating}
              emptySymbol={<FaRegStar className="text-3xl text-yellow-600" />}
              fullSymbol={<FaStar className="text-3xl text-yellow-500" />}
              fractions={2}
              readonly
            />
            
          </div>
          <p className="text-xl font-semibold text-[#1f2937] ">
            Description : {description}
          </p>
          <h2 className="text-2xl font-bold text-[#1f2937]">
            Quantity : {quantity}
          </h2>
          <p className="text-3xl font-semibold text-[#1f2937] ">
            Content of Books : <span className="font-semibold text-xl">{content}</span>
          </p>
          <div className="text-center">
            <button
              onClick={openModal}
              className="w-9/12 my-6 bg-gradient-to-tr from-[#C3DDFD] to-[#FFF9C4] hover:from-[#d6f0ff] hover:to-[#dbcdff] hover:text-black text-xl text-black font-bold py-3 px-6 rounded-md shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:bg-red-800 disabled:from-transparent disabled:via-transparent disabled:to-transparent disabled:text-white"
              disabled={quantity <= 0}
            >
              Borrow
            </button>
          </div>
        </div>
      </div>

      {/* modal start */}

      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Example Modal"
        overlayClassName="fixed inset-0 bg-black/30 flex justify-center items-center"
        className="m-2 lg:m-0 lg:w-8/12 bg-gradient-to-br from-[#dfd4ff] via-[#ab8ef6] to-[#fdeaf7] lg:h-8/12 p-6 lg:p-12 rounded-xl shadow-2xl relative"
      >
        <h1 className="md:text-3xl lg:text-5xl font-bold text-[#1f2937] text-center">
          Select A Return Date To Borrow A Book
        </h1>
        <button
          onClick={closeModal}
          className="btn btn-sm lg:btn-lg btn-error text-black font-bold absolute top-0 right-0"
        >
          X
        </button>
        <div className="py-3 mt-6 text-center">
          <DatePicker
            onChange={(date) => {
              const formattedDate = date.toISOString().split("T")[0];
              setReturnDate(formattedDate);
            }}
            // value={new Date()}
            selected={returnDate}
            placeholderText="Select a Return Date"
            className="lg:w-full lg:py-3 text-white px-5 lg:text-xl lg:font-bold bg-[#1571b5] rounded-xl"
          />
        </div>
        <div className="mx-auto text-center space-y-6 mt-6">
          <input
            className="input lg:w-9/12 mx-auto shadow-2xl bg-[#1571b5] backdrop-blur-sm text-pink-100 border-2 border-cyan-300 py-7 placeholder:text-[17px] placeholder:text-white focus:border-cyan-500 text-xl focus:shadow-2xl focus:shadow-cyan-300"
            type="text"
            name=""
            defaultValue={user?.displayName}
            readOnly
          />
          <input
            className="input lg:w-9/12 mx-auto shadow-2xl bg-[#1571b5] backdrop-blur-sm text-pink-100 border-2 border-cyan-300 py-7 placeholder:text-[17px] placeholder:text-white focus:border-cyan-500 text-xl focus:shadow-2xl focus:shadow-cyan-300"
            type="email"
            name=""
            defaultValue={user?.email}
            readOnly
          />
          <input
          disabled={quantity <= 0}
          onClick={handleBorrowBook}
          type="submit"
          value="Submit"
           className="w-9/12 bg-gradient-to-tr from-[#C3DDFD] to-[#FFF9C4] hover:from-[#d6f0ff] hover:to-[#dbcdff] hover:text-black text-xl text-black font-bold py-3 px-6 rounded-md shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:bg-red-800 disabled:from-transparent disabled:via-transparent disabled:to-transparent disabled:text-white"
        />
        </div>
        
      </Modal>

      {/* modal end */}
    </div>
  );
};

export default BookDetails;
