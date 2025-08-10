import React from 'react';

const HowItWorks = () => {
    const howItWorksSteps = [
  {
    id: 1,
    title: "Register or Login to Get Started",
    description:
      "Create your account or log in securely to access all features like borrowing and managing books easily.",
  },
  {
    id: 2,
    title: "Explore & Find Books",
    description:
      "Browse books by categories or search all books. View details like availability, ratings, and authors.",
  },
  {
    id: 3,
    title: "Borrow Books Securely",
    description:
      "Select a book, choose a return date, and confirm borrowing. Quantity updates automatically in the system.",
  },
  {
    id: 4,
    title: "Manage Borrowed Books",
    description:
      "View your borrowed books, return them to update availability, and admins can add or update book details.",
  },
];


    return (
        <div className='py-12 md:py-24 '>
            <h1 className="text-xl md:text-2xl lg:text-5xl font-primary text-light-text font-bold md:font-extrabold text-center pb-9 md:pb-16">How It Works</h1>
           <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {/* card-1 */}
                {
                    howItWorksSteps.map((works,i)=><div
                    key={i}
                    className='p-3 md:p-5 lg:p-6'
                    >
                        <h1 className='font-primary text-2xl md:text-4xl lg:text-7xl font-bold text-light-text'>{i+1}</h1>
                        <h3 className="pt-2 md:pt-5 md:w-9/12 font-secondary text-light-text text-sm md:text-xl lg:text-3xl font-bold">{works.title}</h3>
                        <p className='py-2 md:py-4 font-secondary text-light-text text-sm lg:text-xl '>{works.description}</p>
                        
                    </div>)
                }
               
           </div>
            <div className='mt-3 md:mt-6 text-center'>
                            <button className="bg-light-primary px-3 py-4 md:px-9 md:py-4 rounded-sm font-secondary font-semibold font-light-text text-md lg:text-xl hover:scale-110 hover:shadow-xl hover:shadow-light-secondary transition duration-300 cursor-pointer text-light-text">Register Now To Get Started</button>
                        </div>
        </div>
    );
};

export default HowItWorks;