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
      .post(
        "https://assignment-11-polished-server-side.vercel.app/books",
        data,
        {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        }
      )
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
        <h1 className="text-xl md:text-2xl lg:text-5xl font-primary text-light-primary font-bold md:font-extrabold text-center py-6">
          Add A Book
        </h1>
        <h3 className="font-secondary text-light-primary text-center text-sm md:text-xl lg:text-3xl font-bold">
          Fill Up The Form To Add A Book!
        </h3>
        <section className="lg:max-w-9/12 mx-auto form-full mt-6 lg:mt-0 p-5 lg:p-14">
          <form onSubmit={handleAddBook}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <fieldset
                className=" backdrop-blur-md  fieldset rounded-box border border-light-primary p-4 "
                style={{ boxShadow: "0 0 10px #00a9e8" }}
              >
                <label className="label text-light-background text-xl lg:text-2xl pb-3">
                  Book Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="input w-full shadow-2xl bg-[#31b8ea20] backdrop-blur-sm text-light-background border-2 border-light-secondary py-7 placeholder:text-[17px] placeholder:text-light-background focus:border-light-primary text-xl focus:shadow-2xl focus:shadow-light-primary"
                  placeholder="Enter Your Book Name"
                />
              </fieldset>
              <fieldset
                className=" backdrop-blur-md  fieldset rounded-box border border-light-primary p-4 "
                style={{ boxShadow: "0 0 10px #00a9e8" }}
              >
                <label className="label text-light-background text-xl lg:text-2xl pb-3">
                  Book Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  className="input w-full shadow-2xl bg-[#31b8ea20] backdrop-blur-sm text-light-background border-2 border-light-secondary py-7 placeholder:text-[17px] placeholder:text-light-background focus:border-light-primary text-xl focus:shadow-2xl focus:shadow-light-primary"
                  placeholder="Image URL"
                />
              </fieldset>
              {/* quantity */}
              <fieldset
                className=" backdrop-blur-md  fieldset rounded-box border border-light-primary p-4 "
                style={{ boxShadow: "0 0 10px #00a9e8" }}
              >
                <label className="label text-light-background text-xl lg:text-2xl pb-3">
                  Enter Book Quantity
                </label>
                <input
                  type="number"
                  min="0"
                  name="quantity"
                  className="input w-full shadow-2xl bg-[#31b8ea20] backdrop-blur-sm text-light-background border-2 border-light-secondary py-7 placeholder:text-[17px] placeholder:text-light-background focus:border-light-primary text-xl focus:shadow-2xl focus:shadow-light-primary"
                  placeholder="Max Members"
                />
              </fieldset>
              {/* quantity */}
              {/* author name */}
              <fieldset
                className=" backdrop-blur-md  fieldset rounded-box border border-light-primary p-4 "
                style={{ boxShadow: "0 0 10px #00a9e8" }}
              >
                <label className="label text-light-background text-xl lg:text-2xl pb-3">
                  Author Name
                </label>
                <input
                  type="text"
                  name="author"
                  placeholder="Author Name"
                  className="input w-full shadow-2xl bg-[#31b8ea20] backdrop-blur-sm text-light-background border-2 border-light-secondary py-7 placeholder:text-[17px] placeholder:text-light-background focus:border-light-primary text-xl focus:shadow-2xl focus:shadow-light-primary"
                />
              </fieldset>
              {/* author name */}

              {/* Category */}
              <fieldset
                className=" backdrop-blur-md  fieldset rounded-box border border-light-primary p-4 "
                style={{ boxShadow: "0 0 10px #00a9e8" }}
              >
                <label className="label text-light-background text-xl lg:text-2xl pb-3">
                  Select Book Category
                </label>
                <select
                  name="category"
                  className="input w-full shadow-2xl bg-[#31b8ea20] backdrop-blur-sm text-light-background border-2 border-light-secondary py-7 placeholder:text-[17px] placeholder:text-light-background focus:border-light-primary text-xl focus:shadow-2xl focus:shadow-light-primary"
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
                className=" backdrop-blur-md  fieldset rounded-box border border-light-primary p-4 "
                style={{ boxShadow: "0 0 10px #00a9e8" }}
              >
                <label className="label text-light-background text-xl lg:text-2xl pb-3">
                  Add Short Description
                </label>
                <textarea
                  name="description"
                  placeholder="Description"
                  className="w-full textarea textarea-xs input shadow-2xl bg-[#31b8ea20] backdrop-blur-md text-light-background border-2 border-light-secondary py-7 placeholder:text-[17px] placeholder:text-white focus:shadow-xl focus:shadow-light-secondary !text-xl"
                ></textarea>
              </fieldset>
              {/* Rating  */}
              <fieldset
                className=" backdrop-blur-md  fieldset rounded-box border border-light-primary p-4 "
                style={{ boxShadow: "0 0 10px #00a9e8" }}
              >
                <label className="label text-light-background text-xl lg:text-2xl pb-3">
                  Enter A Rating
                </label>
                <input
                  type="number"
                  max="5"
                  name="rating"
                  className="input w-full shadow-2xl bg-[#31b8ea20] backdrop-blur-sm text-light-background border-2 border-light-secondary py-7 placeholder:text-[17px] placeholder:text-light-background focus:border-light-primary text-xl focus:shadow-2xl focus:shadow-light-primary"
                  placeholder="Enter a rating"
                />
              </fieldset>
              <fieldset
                className=" backdrop-blur-md  fieldset rounded-box border border-light-primary p-4 "
                style={{ boxShadow: "0 0 10px #00a9e8" }}
              >
                <label className="label text-light-background text-xl lg:text-2xl pb-3">
                  Add Book Content
                </label>
                <textarea
                  name="content"
                  placeholder="Add Book Content"
                  className="w-full textarea textarea-xs input shadow-2xl bg-[#31b8ea20] backdrop-blur-md text-light-background border-2 border-light-secondary py-7 placeholder:text-[17px] placeholder:text-white focus:shadow-xl focus:shadow-light-primary !text-xl"
                ></textarea>
              </fieldset>
            </div>

            <input
              type="submit"
              className="bg-light-primary px-3 py-4 md:px-9 md:py-4 rounded-sm font-primary font-semibold font-light-text text-md lg:text-xl hover:scale-110 hover:shadow-xl hover:shadow-light-secondary transition duration-300 cursor-pointer text-light-text w-full mt-6"
              value="Add Book"
            />
          </form>
        </section>
      </main>
    </div>
  );
};

export default AddBook;
