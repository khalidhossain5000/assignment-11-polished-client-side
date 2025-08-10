import React from "react";
import bgImg from "../../assets/AddUpdateBg/lib-img-ii.jpg";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const AddBook = () => {
  const { user } = useAuth();
  const handleAddBook = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.quantity = parseInt(data.quantity);
    data.rating = parseInt(data.rating);

    //data sending to db
    axios
      .post("http://localhost:3000/books", data, {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Book Added Successfully", {
            className: "w-[300px] h-[100px] text-xl font-bold",
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="d-title">
        <Helmet>
          <title>Add-Book</title>
        </Helmet>
      </div>
      <main
        style={{ backgroundImage: `url(${bgImg})` }}
        className="bg-cover bg-no-repeat py-36 bg-top"
      >
        <h1 className="text-cyan-500 container mx-auto text-center text-3xl md:text-4xl lg:text-6xl font-bold py-6 lg:py-12">
          Add A Book
        </h1>
        <h3 className="text-cyan-200 text-center text-xl lg:text-3xl font-medium">
          Fill Up The Form To Add A Book!
        </h3>
        <section className="lg:max-w-9/12 mx-auto form-full mt-6 lg:mt-0 p-5 lg:p-14">
          <form onSubmit={handleAddBook}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <fieldset
                className=" backdrop-blur-md  fieldset rounded-box border border-cyan-300 p-4 "
                style={{ boxShadow: "0 0 10px #00a9e8" }}
              >
                <label className="label text-cyan-300 text-xl lg:text-2xl pb-3">
                  Book Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="input w-full shadow-2xl bg-[#31b8ea20] backdrop-blur-sm text-pink-100 border-2 border-cyan-300 py-7 placeholder:text-[17px] placeholder:text-white focus:border-cyan-500 text-xl focus:shadow-2xl focus:shadow-cyan-300"
                  placeholder="Enter Your Book Name"
                />
              </fieldset>
              <fieldset
                className=" backdrop-blur-md  fieldset rounded-box border border-cyan-300 p-4 "
                style={{ boxShadow: "0 0 10px #00a9e8" }}
              >
                <label className="label text-cyan-300 text-xl lg:text-2xl pb-3">
                  Book Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  className="input w-full shadow-2xl bg-[#31b8ea20] backdrop-blur-sm text-pink-100 border-2 border-cyan-300 py-7 placeholder:text-[17px] placeholder:text-white focus:border-cyan-500 text-xl focus:shadow-2xl focus:shadow-cyan-300"
                  placeholder="Image URL"
                />
              </fieldset>
              {/* quantity */}
              <fieldset
                className=" backdrop-blur-md  fieldset rounded-box border border-cyan-300 p-4 "
                style={{ boxShadow: "0 0 10px #00a9e8" }}
              >
                <label className="label text-cyan-300 text-xl lg:text-2xl pb-3">
                  Enter Book Quantity
                </label>
                <input
                  type="number"
                  min="0"
                  name="quantity"
                  className="input w-full shadow-2xl bg-[#31b8ea20] backdrop-blur-sm text-pink-100 border-2 border-cyan-300 py-7 placeholder:text-[17px] placeholder:text-white focus:border-cyan-500 text-xl focus:shadow-2xl focus:shadow-cyan-300"
                  placeholder="Max Members"
                />
              </fieldset>
              {/* quantity */}
              {/* author name */}
              <fieldset
                className=" backdrop-blur-md  fieldset rounded-box border border-cyan-300 p-4 "
                style={{ boxShadow: "0 0 10px #00a9e8" }}
              >
                <label className="label text-cyan-300 text-xl lg:text-2xl pb-3">
                  Author Name
                </label>
                <input
                  type="text"
                  name="author"
                  placeholder="Author Name"
                  className="input w-full shadow-2xl bg-[#31b8ea20] backdrop-blur-sm text-pink-100 border-2 border-cyan-300 py-7 placeholder:text-[17px] placeholder:text-white focus:border-cyan-500 text-xl focus:shadow-2xl focus:shadow-cyan-300"
                />
              </fieldset>
              {/* author name */}

              {/* Category */}
              <fieldset
                className=" backdrop-blur-md  fieldset rounded-box border border-cyan-300 p-4 "
                style={{ boxShadow: "0 0 10px #00a9e8" }}
              >
                <label className="label text-cyan-300 text-xl lg:text-2xl pb-3">
                  Select Book Category
                </label>
                <select
                  name="category"
                  className="text-white w-full shadow-2xl backdrop-blur-sm font-semibold border-2 border-cyan-500 py-3 placeholder:text-[17px] placeholder:text-white focus:border-cyan-500 text-xl"
                >
                  {/* <option disabled={true}>Hobby Category</option> */}
                  <option value="" hidden>
                    Select Book Category
                  </option>
                  <option className="bg-cyan-900 ">
                    Computer & Programming
                  </option>
                  <option className="bg-cyan-900 ">Science-Fiction</option>
                  <option className="bg-cyan-900 ">Sports & Games</option>
                  <option className="bg-cyan-900">
                    Self-Development & Meditation
                  </option>
                </select>
              </fieldset>
              {/* Category */}

              {/* descriptions */}
              <fieldset
                className=" backdrop-blur-md  fieldset rounded-box border border-cyan-300 p-4 "
                style={{ boxShadow: "0 0 10px #00a9e8" }}
              >
                <label className="label text-cyan-300 text-xl lg:text-2xl pb-3">
                  Add Short Description
                </label>
                <textarea
                  name="description"
                  placeholder="Description"
                  className="w-full textarea textarea-xs input shadow-2xl bg-[#31b8ea20] backdrop-blur-md text-cyan-100 border-2 border-cyan-300 py-7 placeholder:text-[17px] placeholder:text-white focus:shadow-2xl focus:shadow-cyan-300 !text-xl"
                ></textarea>
              </fieldset>
              {/* Rating  */}
              <fieldset
                className=" backdrop-blur-md  fieldset rounded-box border border-cyan-300 p-4 "
                style={{ boxShadow: "0 0 10px #00a9e8" }}
              >
                <label className="label text-cyan-300 text-xl lg:text-2xl pb-3">
                  Enter A Rating
                </label>
                <input
                  type="number"
                  max="5"
                  name="rating"
                  className="input w-full shadow-2xl bg-[#31b8ea20] backdrop-blur-sm text-pink-100 border-2 border-cyan-300 py-7 placeholder:text-[17px] placeholder:text-white focus:border-cyan-500 text-xl focus:shadow-2xl focus:shadow-cyan-300"
                  placeholder="Enter a rating"
                />
              </fieldset>
              <fieldset
                className=" backdrop-blur-md  fieldset rounded-box border border-cyan-300 p-4 "
                style={{ boxShadow: "0 0 10px #00a9e8" }}
              >
                <label className="label text-cyan-300 text-xl lg:text-2xl pb-3">
                  Add Book Content
                </label>
                <textarea
                  name="content"
                  placeholder="Add Book Content"
                  className="w-full textarea textarea-xs input shadow-2xl bg-[#31b8ea20] backdrop-blur-md text-cyan-100 border-2 border-cyan-300 py-7 placeholder:text-[17px] placeholder:text-white focus:shadow-2xl focus:shadow-cyan-300 !text-xl"
                ></textarea>
              </fieldset>
            </div>

            <input
              type="submit"
              className="cursor-pointer w-full bg-gradient-to-b from-[#0076ff] via-[#00bfff] to-[#0083ff]  p-8 border-cyan-300 text-xl text-pink-100 rounded-xl mt-4 hover:bg-gradient-to-br hover:from-[#001d16] hover:via-[#00ad82] hover:to-[#1d717e] transition duration-300 hover:scale-105 ease-in-out hover:animate-pulse"
              value="Add Book"
            />
          </form>
        </section>
      </main>
    </div>
  );
};

export default AddBook;
