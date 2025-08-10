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
  const [detailsLoading, setDetailsLoading] = useState(true);
  const { user, loading } = useAuth();
  //data loading use effect starts here
  useEffect(() => {
    setDetailsLoading(true);
    if (loading) return <Loading />;
    axios(
      `https://assignment-11-polished-server-side.vercel.app/allBooks/${id}`,
      {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
        },
      }
    )
      .then((res) => {
        const data = res.data;
        setBooks(data);
        setDetailsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setDetailsLoading(false);
      });
  }, [id, user?.accessToken, loading]);
  //data loading use effect ends
  if (detailsLoading) return <Loading />;
  // MODAL RELATED FUNC
  const openModal = () => {
    setModalIsOpen(true);
  };
  //after modal opne later if needed

  const closeModal = () => {
    setModalIsOpen(false);
  };
  Modal.setAppElement("#root");
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
              backgroundImage:
                "linear-gradient(to bottom right, #31c3df, #3a47d5)",
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
            customClass: {
              popup: "error-gradient-bg",
            },
          });
        } else {
          console.log("Borrow error occurred");
        }
      });
  };

  return (
    <div className="py-12 lg:py-24 bg-light-background ">
      <div className="d-title">
        <Helmet>
          <title>Book-Details</title>
        </Helmet>
      </div>

      <div className="container mx-auto py-24 lg:flex justify-center gap-12 shadow-xl shadow-light-secondary border-1 border-light-secondary rounded-md">
        <div className="imgs rounded-sm p-5 !h-full border-1 border-light-primary">
          <img
            className="hover:scale-105 hover:saturate-150 cursor-pointer transition duration-300 lg:w-96 mx-auto w-56"
            src={imageUrl}
            alt=""
          />
        </div>

        <div className="contnt w-full space-y-2">
          <h1 className="font-secondary text-light-text text-sm md:text-xl lg:text-3xl font-bold">
            {title}
          </h1>
          <h2 className="font-secondary text-light-text text-sm md:text-xl font-bold">
            By :{" "}
            <span className="text-light-primary font-extrabold font-primary">
              {author}
            </span>
          </h2>
          <h2 className="font-secondary text-light-text text-sm md:text-xl font-semibold">
            Category :{" "}
            <span className="text-light-primary font-primary font-extrabold">
              {category}
            </span>
          </h2>

          <div className="rtign lg:py-3 flex flex-col md:flex-row gap-3 items-center">
            <h2 className="font-secondary text-light-text text-sm md:text-2xl font-semibold">
              Rating :
            </h2>
            <Rating
              initialRating={rating}
              emptySymbol={<FaRegStar className="text-xl text-light-text" />}
              fullSymbol={<FaStar className="text-xl text-light-primary" />}
              fractions={2}
              readonly
            />
          </div>
          <p className="py-2 md:py-4 font-secondary text-light-text text-sm lg:text-xl ">
            <span className="font-secondary text-light-text text-sm md:text-xl lg:text-2xl font-bold">
              Description
            </span>{" "}
            : {description}
          </p>
          <h2 className="font-secondary text-light-text text-sm md:text-2xl font-semibold">
            Quantity : {quantity}
          </h2>
          <p className="py-2 md:py-4 font-secondary text-light-text text-sm lg:text-xl ">
            <span className="font-secondary text-light-text text-sm md:text-xl lg:text-2xl font-bold">
              Content of Books{" "}
            </span>
            : <span className="font-semibold text-xl">{content}</span>
          </p>
          <div className="">
            <button
              onClick={openModal}
              className="bg-light-primary px-3 py-4 md:px-9 md:py-4 rounded-sm font-secondary font-semibold font-light-text text-md lg:text-xl hover:scale-105 hover:shadow-xl hover:shadow-light-secondary transition duration-300 cursor-pointer text-light-text w-full mx-2 md:mx-0"
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
        className="m-2 lg:m-0 md:w-6/12 md:h-6/12 lg:w-9/12 bg-light-primary lg:h-9/12 p-6 lg:p-12 rounded-xl shadow-xl relative"
      >
        <h1 className="font-secondary text-light-text text-sm md:text-xl lg:text-3xl font-bold text-center">
          Select A Return Date To Borrow A Book
        </h1>
        <button
          onClick={closeModal}
          className="btn btn-sm lg:btn-lg bg-light-text text-light-background font-bold absolute top-0 right-0"
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
            className="lg:w-full lg:py-3 text-light-background px-5 lg:text-xl lg:font-bold bg-light-text rounded-xl"
          />
        </div>
        <div className="mx-auto text-center space-y-6 mt-6">
          <input
            className="input lg:w-9/12 mx-auto shadow-2xl bg-light-text backdrop-blur-sm text-light-background placeholder:bg-light-background border-2 py-7 placeholder:text-[17px] text-xl focus:shadow-2xl focus:shadow-light-text"
            type="text"
            name=""
            defaultValue={user?.displayName}
            readOnly
          />
          <input
            className="input lg:w-9/12 mx-auto shadow-2xl bg-light-text backdrop-blur-sm text-light-background placeholder:bg-light-background border-2 py-7 placeholder:text-[17px] text-xl focus:shadow-2xl focus:shadow-light-text"
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
            className="bg-light-text px-3 py-4 md:px-9 md:py-4 rounded-sm font-secondary font-semibold font-light-text text-md lg:text-xl hover:scale-105 hover:shadow-xl hover:shadow-light-secondary transition duration-300 cursor-pointer text-light-background w-6/12 lg:mx-auto mx-2 md:mx-0"
          />
        </div>
      </Modal>

      {/* modal end */}
    </div>
  );
};

export default BookDetails;
