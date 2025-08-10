import React from "react";
import Loading from "../../../Components/Loading/Loading";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const AllBookReview = () => {
  const { user } = useAuth();

  //FETCH ALL USERS
  const { data, isLoading, refetch } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      // const res = await axiosSecure.get("/users");
      const res = await axios.get("http://localhost:3000/all-book-review");

      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;

  const handleStatus = async (reviewId) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/book-review/${reviewId}`,
        {
          status: "approved",
        }
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire("Approved!", "Article has been approved.", "success");
        refetch(); // refetch article list after approval
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };
  return (
    <div className="py-12 ">
      <div className="px-12 w-full lg:w-11/12 mx-auto rounded-2xl shadow-xl h-48 bg-gradient-to-tr from-[#F4F6FE] via-[#E0E2F0] to-[#D4D7E3] flex items-center justify-center relative overflow-hidden ">
        <div className="text-center px-4">
          <h1 className="text-[#211F54] text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            All Book Review
          </h1>
        </div>
        {/* Subtle overlay shapes in primary text color */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#211F54] opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#211F54] opacity-10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
      <div className="overflow-x-auto rounded-box border border-gray-500 p-6 bg-white max-w-7xl mx-auto mt-6 lg:mt-12">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-2xl text-[#211f54] rancho border-b border-b-gray-300 ">
              <th>#</th>
              <th>Book Image</th>
              <th>Book Name</th>
              <th>Book Author</th>
              <th>Category</th>
              <th>Rating</th>
              <th>Reviewer Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.map((review, i) => (
              <tr key={i} className="">
                <th className="border-b border-gray-300">{i + 1}</th>
                <td className="border-b border-gray-300">
                  <img
                    src={review?.imageUrl}
                    alt={review?.name}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td className="text-xs md:text-[17px] urbanist font-medium text-gray-800 border-b border-gray-300">
                  {review?.title}
                </td>
                <td className="text-xs md:text-[17px] urbanist font-medium text-gray-800 border-b border-gray-300">
                  {review?.author}
                </td>
                <td className="text-xs md:text-[19px] urbanist font-bold text-gray-800 border-b border-gray-300">
                  {review?.category}
                </td>
                <td className="text-xs md:text-[19px] urbanist font-bold text-gray-800 border-b border-gray-300">
                  {review?.rating}
                </td>

                <td className="text-xs md:text-[19px] urbanist font-bold text-gray-800 border-b border-gray-300">
                  {review?.reviewerName}
                </td>

                <td className="text-xs md:text-[19px] urbanist font-bold text-gray-800 border-b border-gray-300">
                  {review?.reviewerEmail}
                </td>

                <td className="text-xs md:text-[19px] urbanist font-bold text-gray-800 border-b border-gray-300">
                  {review?.status}
                </td>
                <td className="text-xs md:text-[19px] urbanist font-bold text-gray-800 border-b border-gray-300">
                  <button
                    onClick={() => handleStatus(review?._id)}
                    className="btn btn-sm btn-success"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBookReview;
