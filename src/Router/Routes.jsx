import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "../Routes/PrivateRoute";
import AllBooks from "../Pages/AllBooks/AllBooks";
import AddBook from "../Pages/AddBook/AddBook";
import BorrowedBooks from "../Pages/BorrowedBook/BorrowedBooks";
import BookCategory from "../Pages/BookCategory/BookCategory";
import Loading from "../Components/Loading/Loading";
import BookDetails from "../Pages/BookDetails/BookDetails";
import UpdateBook from "../Pages/UpdateBookPage/UpdateBook";
import ErrorPage from "../Pages/ErrorPageGlobal/ErrorPage";
import AdminDashBoard from "../Pages/DashBoard/AdminDashBoard";
import UserProfileDashBoard from "../Pages/DashBoard/UserProfileDashBoard";
import AllUsers from "../Pages/DashBoard/AllUsers/AllUsers";
import BookReviewForm from "../Pages/AddBookReview/BookReviewForm";
import AllBookReview from "../Pages/DashBoard/AllBookReview/AllBookReview";
import AllBooksReview from "../Pages/AllBooksReview/AllBooksReview";
import BookReviewsDetails from "../Pages/Home/BookReviewSection/BookReviewsDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-books",
        element: (
         
            <AllBooks></AllBooks>
         
        ),
      },
      {
        path: "all-books-review",
        element: (
         
            <AllBooksReview></AllBooksReview>
         
        ),
      },
      {
        path: "all-books/:id",
        element: (
          <PrivateRoute>
            <BookDetails></BookDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "update-book/:id",
        element: (
          <PrivateRoute>
            <UpdateBook></UpdateBook>
          </PrivateRoute>
        ),
      },
      {
        path: "add-books",
        element: (
          <PrivateRoute>
            <AddBook></AddBook>
          </PrivateRoute>
        ),
      },
      {
        path: "add-book-review",
        element: (
          <PrivateRoute>
            <BookReviewForm></BookReviewForm>
          </PrivateRoute>
        )
      },
      {
        path: "book-review-details/:id",
        element: (
          <PrivateRoute>
            <BookReviewsDetails></BookReviewsDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "borrowed-books/:email",
        element: (
          <PrivateRoute>
            <BorrowedBooks></BorrowedBooks>
          </PrivateRoute>
        ),
      },
      {
        path: "book-categories/:name",
        Component: BookCategory,
        loader: () =>
          fetch(
            "https://assignment-11-server-five-lake.vercel.app/categoryAllBooks"
          ),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "admin-dashboard",
    element: <AdminDashBoard></AdminDashBoard>,
    children: [
      {
        index:true,
        element: <AllUsers></AllUsers>,
      },
      {
        path:'all-book-review',
        element:<AllBookReview></AllBookReview>
      }
    ],
  },

  {
    path: "my-profile",
    element: <UserProfileDashBoard></UserProfileDashBoard>,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
