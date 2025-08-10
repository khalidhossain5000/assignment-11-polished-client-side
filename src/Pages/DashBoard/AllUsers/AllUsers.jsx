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
      const res = await axios.get(
        "https://assignment-11-polished-server-side.vercel.app/users"
      );

      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(data);
  if (isLoading) return <Loading />;
  return (
    <div className=" ">
      <div className="px-12 w-full rounded-2xl shadow-xl h-48 bg-light-background flex items-center justify-center relative overflow-hidden ">
        <div className="text-center px-4">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-primary text-light-text font-bold md:font-extrabold text-center">
            All Users
          </h1>
        </div>
      </div>
      <div className="overflow-x-auto rounded-box border-1 border-light-primary p-6 bg-white max-w-7xl mx-auto mt-6 lg:mt-12">
        <table className="table ">
          {/* head */}
          <thead>
            <tr className="text-xl md:text-2xl font-primary text-light-text border-b border-b-light-primary ">
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
                <th className="border-b border-light-primary">{i + 1}</th>
                <td className="border-b border-light-primary">
                  <img
                    src={user?.profilePic}
                    alt={user?.name}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td className="text-xs md:text-[17px] urbanist font-medium text-gray-800 border-b border-light-primary">
                  {user?.name}
                </td>
                <td className="text-xs md:text-[17px] urbanist font-medium text-gray-800 border-b border-light-primary">
                  {user?.email}
                </td>
                <td className="text-xs md:text-[19px] urbanist font-bold text-gray-800 border-b border-light-primary">
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
