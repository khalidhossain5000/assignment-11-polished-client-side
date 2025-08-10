## Project Title: Library Management System

## Descriptions:

A well-renowned school requires the development of a Library Management System, accessible via a website. The system should allow the addition and categorization of books in their collection, with the ability to update book information. It should also support tracking of borrowed and returned books, ensuring efficient management of all transactions. The website should offer a user-friendly interface for users, facilitating smooth operations and easy access to the library's resources.

### Purpose :

The purpose of this website is to simplify of managing books,
users.Keep data about all the books and users also keeping the
data about borrowed books by users.It provides the librians
and users a easy-to-use interface for tracking books,issueing
books , and record data about it.

## 🚀🚀 Project Live Url : https://assignment-11-library-cloud-app.netlify.app/

# Installation & Setup Guide

### Prerequisites

_(Prerequisites means the things you need to have or prepare before you can run the project)_

- **Node.js** (version 16 or above) — [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A **Firebase project** with Authentication enabled (Email/Google sign-in)

---

## Steps to Run Locally

### 1. **Clone the repository**

```bash
  git clone https://github.com/khalidhossain5000/library-management-system-library-cloud-web-app.git

  cd the-voice-daily-newspaper-web-app

```

### 2.Install dependencies

```bash
### Using npm:

  npm install

  cd the-voice-daily-newspaper-web-app

```

### 3.Set up Firebase configuration

- Create a Firebase project in the Firebase Console.
- Enable Authentication methods (Email, Google sign-in).
- Copy your Firebase config object from project settings.
- Create a .env file in the root folder and add:

```bash

REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### Replace the values with your Firebase config.

### 4.Start the development server

```bash

npm run dev

```

### Open your browser and go to

```bash

https://assignment-11-polished-server-side.vercel.app


```

## Your app should now be running locally!

# Features

- Storing and managing Data in MongoDB.
- Keeping records about all Books.
- User Authentication system.
- Borrow books Features for the user.
- Return the borrow book .
- Keeping record about borrow and return books.
- Real Time Monitoring quantity of the Books.
- Prevent Multiple borrow for the books.
- Token based Authentication using fireBase userAccessToke.
- Secured api using Token system.
- Aweosme Interface.

## Dependencies :

**FrontEnd:**

- React
- React-Router
- TailwindCss
- DaisyUI
- Axios
- Firebase
- Motion
- react-datepicker
- react-fast-marquee
- react-hot-toast
- react-icons
- react-modal
- react-rating
- react-spinners
- sweetalert2
- swiper
- React Helment async

**BackEnd:**

- Node-Js.
- cors
- dotenv
- express
- firebase-admin
- mongodb
