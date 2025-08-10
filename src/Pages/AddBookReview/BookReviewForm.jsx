import React from "react";
import bgImg from "../../assets/BlogsBg/anthers.jpg";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const BookReviewForm = () => {
  const { user } = useAuth();
  const handleBookReviewForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.quantity = parseInt(data.quantity);
    data.rating = parseInt(data.rating);

    const bookReviewData = {
      ...data,
      status: "pending",
      reviewerName:user?.displayName,
      reviewerEmail:user?.email
    };
    //data sending to db
    axios
      .post("http://localhost:3000/add-book-review", bookReviewData, {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.insertedId) {
          Swal.fire({
            title: "Blogs Added Successfully",
            icon: "success",
            html: "<p class='text-xl   mt-2'>Your Blogs has been submitted and is currently under review. It will be published once approved by an admin.</p>",
            confirmButtonText: "Ok!",
            background: "#0a2b4a", // dark bg
            color: "#ffffff", // white text
            buttonsStyling: false,
            customClass: {
              popup: "gradient-bg",
              confirmButton:
                "bg-[#13a0b5] hover:bg-[#040230] text-white font-semibold px-6 py-2 rounded-sm shadow-md  cursor-pointer",
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
          Add A Book Review
        </h1>
        <h3 className="text-cyan-200 text-center text-xl lg:text-3xl font-medium">
          Fill Up The Form To Add A Book Review!
        </h3>
        <section className="lg:max-w-9/12 mx-auto form-full mt-6 lg:mt-0 p-5 lg:p-14">
          <form onSubmit={handleBookReviewForm}>
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
              {/* author name */}
              <fieldset
                className=" backdrop-blur-md  fieldset rounded-box border border-cyan-300 p-4 "
                style={{ boxShadow: "0 0 10px #00a9e8" }}
              >
                <label className="label text-cyan-300 text-xl lg:text-2xl pb-3">
                 Book Author Name
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

export default BookReviewForm;
