"use client"
import * as React from "react";
import Aside from "../components/Aside";
import Dashboard from "../components/Dashboard";
import TestDownload from "../components/TestDownload";
import CreateTrip from "../components/CreateTrip";
// import Request from "./components/Request";
import RequestListPage from "../components/RequestListPage";
import Test from "../components/Test";
import Trips from "../components/Trips";
import Link from "next/link";


interface AdminProps {}

const Admin: React.FC<AdminProps> = () => {
  const [activeNavItem, setActiveNavItem] = React.useState<string>("dashboard");
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  const handleNavItemClick = (navItem: string): void => {
    setActiveNavItem(navItem);
    // Hide the mobile menu after clicking a navigation item
    setShowMobileMenu(false);
  };

  const toggleMobileMenu = (): void => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <>
      <div className="sticky top-0">
        {/* <Header /> */}
        <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
          <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
            <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">
              Dashboard
            </h5>
            <button
              className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-lg"
              onClick={toggleMobileMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            {/* Mobile menu overlay */}
            <div
              className={`fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 ${
                showMobileMenu ? "block" : "hidden"
              }`}
            >
              <ul className="mt-16 space-y-4 text-center">
                <li>
                  <Link href="/" onClick={() => handleNavItemClick("dashboard")} className="block text-white font-bold">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="#" onClick={() => handleNavItemClick("trips")} className="block text-white font-bold">
                    Trips
                  </Link>
                </li>
                <li>
                  <Link href="#" onClick={() => handleNavItemClick("RequestListPage")} className="block text-white font-bold">
                    Request
                  </Link>
                </li>
                <li>
                  <Link href="#" onClick={() => handleNavItemClick("uploadTrips")} className="block text-white font-bold">
                    Upload Trips
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row bg-gray-100  w-full">
        <div
          className={` md:w-1/4 flex bg-gray-100 ${
            showMobileMenu ? "block" : "hidden lg:block"
          }`}
        >
          <Aside
            activeNavItem={activeNavItem}
            onNavItemClick={handleNavItemClick}
          />
        </div>
        <div className="md:w-full bg-gray-100 m-auto ">
          {activeNavItem === "dashboard" && <Dashboard />}
          {activeNavItem === "trips" && <Trips />}
          {/* {activeNavItem === "request" && <Request city={""} firstName={""} lastName={""} email={""} phone={""} type={""} country={""} dCountry={""} dCity={""} startDate={""} numberOfPeople={0} contactMethod={""} days={0} created={""} />} */}
          {activeNavItem === "request" && <RequestListPage  />}
          {activeNavItem === "uploadTrips" && <CreateTrip />}
        </div>
      </div>
    </>
  );
};

export default Admin;
