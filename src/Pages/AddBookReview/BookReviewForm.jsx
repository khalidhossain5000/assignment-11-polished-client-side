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
      reviewerName: user?.displayName,
      reviewerEmail: user?.email,
    };
    //data sending to db
    axios
      .post(
        "https://assignment-11-polished-server-side.vercel.app/add-book-review",
        bookReviewData,
        {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        }
      )
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
        <h1 className="text-xl md:text-2xl lg:text-5xl font-primary text-light-primary font-bold md:font-extrabold text-center py-6">
          Add A Book Review
        </h1>
        <h3 className="font-secondary text-light-primary text-center text-sm md:text-xl lg:text-3xl font-bold">
          Fill Up The Form To Add A Book Review!
        </h3>
        <section className="lg:max-w-9/12 mx-auto form-full mt-6 lg:mt-0 p-5 lg:p-14">
          <form onSubmit={handleBookReviewForm}>
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
              {/* author name */}
              <fieldset
                className=" backdrop-blur-md  fieldset rounded-box border border-light-primary p-4 "
                style={{ boxShadow: "0 0 10px #00a9e8" }}
              >
                <label className="label text-light-background text-xl lg:text-2xl pb-3">
                  Book Author Name
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
                className=" backdrop-blur-md  fieldset rounded-box border border-light-primary p-4 "
                style={{ boxShadow: "0 0 10px #00a9e8" }}
              >
                <label className="label text-light-background text-xl lg:text-2xl pb-3">
                  Add Short Description
                </label>
                <textarea
                  name="description"
                  placeholder="Description"
                  className="w-full textarea textarea-xs input shadow-2xl bg-[#31b8ea20] backdrop-blur-md text-cyan-100 border-2 border-light-primary py-7 placeholder:text-[17px] placeholder:text-white focus:shadow-2xl focus:shadow-cyan-300 !text-xl"
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
            </div>

            <input
              type="submit"
              className="bg-light-primary px-3 py-4 md:px-9 md:py-4 rounded-sm font-primary font-semibold font-light-text text-md lg:text-xl hover:scale-110 hover:shadow-xl hover:shadow-light-secondary transition duration-300 cursor-pointer text-light-text w-full mt-6"
              value="Add Book Review"
            />
          </form>
        </section>
      </main>
    </div>
  );
};

export default BookReviewForm;
