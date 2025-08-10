import bgImg from "../../assets/AddUpdateBg/bg-i.jpg";
import { useParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet-async";

const UpdateBook = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [existingData, setExistingData] = useState({});
  const {
    title,
    imageUrl,
    rating,
    author,
    // quantity,
    category,
    _id,
    // description,
    // content,
  } = existingData || {};

  //fetching this books singlle data
  useEffect(() => {
    axios(`http://localhost:3000/allBooks/${id}`, {
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((res) => {
        const data = res.data;
        console.log(data);
        setExistingData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, user?.accessToken]);
  const handleUpdateGroup = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedData = Object.fromEntries(formData.entries());
    updatedData.quantity = parseInt(updatedData.quantity);

    //UPDATE DATA STRATS
    axios
      .put(
        `https://assignment-11-server-five-lake.vercel.app/all-books/${_id}`,
        updatedData
      )
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: "Book has been updated successfully",
          icon: "success",
          theme: "dark",
          customClass: {
            popup: "gradient-bg",
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!category) return <Loading />;
  return (
    <div>
      <div className="dynamic-title">
        <Helmet>
          <title>Update-Book</title>
        </Helmet>
      </div>
      <main
        style={{ backgroundImage: `url(${bgImg})` }}
        className="bg-cover bg-no-repeat py-36 bg-top"
      >
        <h1 className="text-cyan-500 container mx-auto text-center text-3xl md:text-4xl lg:text-6xl font-bold py-6 lg:py-12">
          Update Book
        </h1>
        <h3 className="text-cyan-200 text-center text-xl lg:text-3xl font-medium">
          Fill Up The Form To Update The Book!
        </h3>
        <section className="lg:max-w-9/12 mx-auto form-full mt-6 lg:mt-0 p-5 lg:p-14">
          <form onSubmit={handleUpdateGroup}>
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
                  defaultValue={title}
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
                  defaultValue={imageUrl}
                />
              </fieldset>
              {/* quantity */}
              
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
                  defaultValue={author}
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
                  defaultValue={category}
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
                  <option className="bg-cyan-900 ">
                    Self-Development & Meditation
                  </option>
                </select>
              </fieldset>
              {/* Category */}

              
              {/* Rating  */}
              <fieldset
                className="col-span-1 backdrop-blur-md  fieldset rounded-box border border-cyan-300 p-4 "
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
                  defaultValue={rating}
                />
              </fieldset>
             
            </div>

            <input
              type="submit"
              className="cursor-pointer w-full bg-gradient-to-b from-[#0076ff] via-[#000711] to-[#0083ff]  p-8 border-cyan-300 text-xl text-pink-100 rounded-xl mt-4 hover:bg-gradient-to-br hover:from-[#001d16] hover:via-[#000711] hover:to-[#1d717e] transition duration-300 hover:scale-105 ease-in-out hover:animate-pulse"
              value="Update Book"
            />
          </form>
        </section>
      </main>
    </div>
  );
};

export default UpdateBook;
