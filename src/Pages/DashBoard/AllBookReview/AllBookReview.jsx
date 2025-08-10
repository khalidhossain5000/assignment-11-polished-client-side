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
    <div className=" ">
      <div className="px-12 w-full  mx-auto rounded-2xl shadow-xl h-48 bg-light-background flex items-center justify-center relative overflow-hidden dark:bg-dark-background">
        <div className="text-center px-4">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-primary text-light-text font-bold md:font-extrabold text-center dark:text-dark-text">
            All Book Review
          </h1>
        </div>
       
      </div>
      <div className="overflow-x-auto rounded-box border border-light-primary p-6 bg-light-secondary dark:bg-dark-secondary container mx-auto mt-6 lg:mt-12">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-xl md:text-2xl text-light-text rancho border-b border-b-light-primary dark:text-dark-text">
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
                <th className="border-b border-light-primary">{i + 1}</th>
                <td className="border-b border-light-primary dark:text-dark-text">
                  <img
                    src={review?.imageUrl}
                    alt={review?.name}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td className="text-xs md:text-[17px] urbanist font-medium text-light-text border-b border-light-primary dark:text-dark-text">
                  {review?.title}
                </td>
                <td className="text-xs md:text-[17px] urbanist font-medium text-light-text border-b border-light-primary dark:text-dark-text">
                  {review?.author}
                </td>
                <td className="text-xs md:text-[19px] urbanist font-bold text-light-text border-b border-light-primary dark:text-dark-text">
                  {review?.category}
                </td>
                <td className="text-xs md:text-[19px] urbanist font-bold text-light-text border-b border-light-primary dark:text-dark-text">
                  {review?.rating}
                </td>

                <td className="text-xs md:text-[19px] urbanist font-bold text-light-text border-b border-light-primary" dark:text-dark-text>
                  {review?.reviewerName}
                </td>

                <td className="text-xs md:text-[19px] urbanist font-bold text-light-text border-b border-light-primary">
                  {review?.reviewerEmail}
                </td>

                <td className="text-xs md:text-[19px] urbanist font-bold text-light-text border-b border-light-primary dark:text-dark-text">
                  {review?.status}
                </td>
                <td className="text-xs md:text-[19px] urbanist font-bold text-light-text border-b border-light-primary dark:text-dark-text">
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
