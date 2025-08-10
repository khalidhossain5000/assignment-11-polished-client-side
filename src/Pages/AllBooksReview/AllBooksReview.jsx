import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AllBooksReview = () => {
  const { user } = useAuth();

  //FETCH ALL reviews
  const { data, isLoading } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      // const res = await axiosSecure.get("/users");
      const res = await axios.get("http://localhost:3000/reviews/approved");

      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(data, isLoading);
  if (isLoading) return <Loading />;
  return <div></div>;
};

export default AllBooksReview;
