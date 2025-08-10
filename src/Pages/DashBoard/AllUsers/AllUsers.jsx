import React from "react";
import Loading from "../../../Components/Loading/Loading";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";

const AllUsers = () => {
  const { user } = useAuth();

  //FETCH ALL USERS
  const { data, isLoading } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      // const res = await axiosSecure.get("/users");
      const res = await axios.get("http://localhost:3000/users");

      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(data);
  if (isLoading) return <Loading />;
  return (
    <div className="py-12 ">
      <div className="px-12 w-full lg:w-11/12 mx-auto rounded-2xl shadow-xl h-48 bg-gradient-to-tr from-[#F4F6FE] via-[#E0E2F0] to-[#D4D7E3] flex items-center justify-center relative overflow-hidden ">
        <div className="text-center px-4">
          <h1 className="text-[#211F54] text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            All Users
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
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.map((user, i) => (
              <tr key={i} className="">
                <th className="border-b border-gray-300">{i + 1}</th>
                <td className="border-b border-gray-300">
                  <img
                    src={user?.profilePic}
                    alt={user?.name}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td className="text-xs md:text-[17px] urbanist font-medium text-gray-800 border-b border-gray-300">
                  {user?.name}
                </td>
                <td className="text-xs md:text-[17px] urbanist font-medium text-gray-800 border-b border-gray-300">
                  {user?.email}
                </td>
                <td className="text-xs md:text-[19px] urbanist font-bold text-gray-800 border-b border-gray-300">
                  {user?.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
