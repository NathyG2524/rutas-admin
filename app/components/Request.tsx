import * as React from "react";
import { useGetPrivateTripsQuery } from "../../features/api/apiSlice";
import Loading from "./Loading";
import { useState } from "react";

interface Trip {
  id: string;
  travelCity: string;
  firstName: string;
  lastName: string;
  startedDate: string;
  numberOfPeople: number;
  numberOfDays: number;
  contactMethod: string;
  email: string;
  phoneNumber: string;
  tripType: string;
  country: string;
  destinationCountry: string;
  departureCity: string;
  createdAt: string;
}

const Request: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const {
    data: trips,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPrivateTripsQuery({});

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = (
      <div className="flex flex-col">
        {trips?.items?.map((trip: Trip, index: number) => (
          <div
            key={trip.id}
            onClick={() => toggleAccordion(index)}
            className="flex flex-col"
          >
            <div className="flex flex-col">
              <Card
                city={trip.travelCity}
                firstName={trip.firstName}
                lastName={trip.lastName}
                startDate={trip.startedDate}
                numberOfPeople={trip.numberOfPeople}
                days={trip.numberOfDays}
                contactMethod={trip.contactMethod}
              />
              <div className="mt-4">
                {activeIndex === index && (
                  <Detail
                    city={trip.travelCity}
                    firstName={trip.firstName}
                    lastName={trip.lastName}
                    email={trip.email}
                    phone={trip.phoneNumber}
                    type={trip.tripType}
                    country={trip.country}
                    dCountry={trip.destinationCountry}
                    dCity={trip.departureCity}
                    startDate={trip.startedDate}
                    numberOfPeople={trip.numberOfPeople}
                    contactMethod={trip.contactMethod}
                    days={trip.numberOfDays}
                    created={trip.createdAt}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (isError) {
    content = <p>{}</p>;
  }
  return (
    <main
      className="flex-1 bg-gray-100 dark:bg-gray-900 overflow-y-auto transition duration-500 ease-in-out w-full"
    >
      <div className="flex flex-col px-24 py-12 text-gray-700 dark:text-gray-500 transition duration-500 ease-in-out">
        <h2 className="text-4xl font-medium capitalize">Private Trips</h2>
        <div className="mt-1 mb-4 flex flex-row items-center justify-between"></div>
        <div className="border dark:border-gray-700 transition duration-500 ease-in-out"></div>
        {content}
      </div>
    </main>
  );
};

interface CardProps {
  city: string;
  firstName: string;
  lastName: string;
  startDate: string;
  numberOfPeople: number;
  days: number;
  contactMethod: string;
}

const Card: React.FC<CardProps> = (props) => {
  const date = new Date(`${props.startDate}`);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
  });
  return (
    <div className="flex flex-col mt-2">
      <div className="flex flex-row mt-2">
        <div className="flex w-full items-center justify-between bg-white dark:bg-gray-800 px-8 py-6 border-l-4 border-green-500 dark:border-green-300">
          <div className="flex">
            <div className="flex flex-col ml-6">
              <span className="text-lg font-bold">{props.city}</span>
              <div className="mt-4 flex">
                <div className="flex">
                  <svg
                    className="h-5 w-5 fill-current dark:text-gray-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z"></path>
                  </svg>
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300 capitalize">
                    <p>
                      {props.firstName} {props.lastName}
                    </p>
                  </span>
                </div>
                <div className="flex ml-6">
                  <svg
                    className="h-5 w-5 fill-current dark:text-gray-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2h-1V1m-1 11h-5v5h5v-5z"></path>
                  </svg>
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                    {formattedDate}
                  </span>
                </div>
                <div className="flex ml-6">
                  <svg
                    className="h-5 w-5 fill-current dark:text-gray-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.92 6-4.72 7.28L13 17v5h5l-1.22-1.22C19.91 19.07 22 15.76 22 12c0-5.18-3.95-9.45-9-9.95M11 2c-1.95.2-3.8.96-5.32 2.21L7.1 5.63A8.195 8.195 0 0111 4V2M4.2 5.68C2.96 7.2 2.2 9.05 2 11h2c.19-1.42.75-2.77 1.63-3.9L4.2 5.68M6 8v2h3v1H8c-1.1 0-2 .9-2 2v3h5v-2H8v-1h1c1.11 0 2-.89 2-2v-1a2 2 0 00-2-2H6m6 0v5h3v3h2v-3h1v-2h-1V8h-2v3h-1V8h-2M2 13c.2 1.95.97 3.8 2.22 5.32l1.42-1.42A8.21 8.21 0 014 13H2m5.11 5.37l-1.43 1.42A10.04 10.04 0 0011 22v-2a8.063 8.063 0 01-3.89-1.63z"></path>
                  </svg>
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300 capitalize">
                    <p> {props.days} days </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col -mt-10 mr-20">
            <span className="font-semibold text-green-500 dark:text-green-300">
              Refunded
            </span>
            <span className="font-semibold text-green-500 dark:text-green-300">
              200 $
            </span>
            <span className="text-sm text-gray-700 dark:text-gray-400 mt-2">
              300,00kr
            </span>
          </div>
        </div>
        <div className="text-center flex flex-col items-center justify-center bg-white dark:bg-gray-800 dark:text-gray-300 ml-1 px-12 cursor-pointer hover:bg-blue-200 dark-hover:bg-blue-500 rounded-lg">
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
            <path d="M9.47 9.65l-1.41 1.42L11 14l5.19-5.18-1.41-1.42L11 11.18M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2m0 15l-5-2.18L7 18V5h10z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

interface DetailProps {
  city: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: string;
  country: string;
  dCountry: string;
  dCity: string;
  startDate: string;
  numberOfPeople: number;
  contactMethod: string;
  days: number;
  created: string;
  description?: string;
}

const Detail: React.FC<DetailProps> = (props) => {
  const date = new Date(`${props.startDate}`);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const createdAt = new Date(`${props.created}`);
  const createdDate = createdAt.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
  });
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
        <div className="p-4 border-b">
          <h2 className="text-2xl ">Trip Request</h2>
          <p className="text-sm text-gray-500">Personal details </p>
        </div>
        <div>
          <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="text-gray-600">Full name</p>
            <p>
              {props.firstName} {props.lastName}
            </p>
          </div>
          <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="text-gray-600">Traveling To</p>
            <p>{props.city}</p>
          </div>
          <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="text-gray-600">Email Address</p>
            <p>{props.email}</p>
          </div>
          <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="text-gray-600">Phone Number</p>
            <p>{props.phone}</p>
          </div>
        </div>
        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p className="text-gray-600">Number of People</p>
          <p>{props.numberOfPeople}</p>
        </div>
        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p className="text-gray-600">From</p>
          <p>
            {props.country}, {props.city}
          </p>
        </div>
        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p className="text-gray-600">To</p>
          <p>
            {props.dCountry}, {props.dCity}
          </p>
        </div>
        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p className="text-gray-600">Total Days</p>
          <p>{props.days} days</p>
        </div>
        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p className="text-gray-600">Starting Date</p>
          <p>{formattedDate}</p>
        </div>
        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p className="text-gray-600">Type</p>
          <p>{props.type}</p>
        </div>
        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p className="text-gray-600">Preferred contact method</p>
          <p>{props.contactMethod}</p>
        </div>
        {props.description && (
          <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="text-gray-600">Description</p>
            <p>{props.description}</p>
          </div>
        )}
        <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
          <p className="text-gray-600">Request Date</p>
          <p>{createdDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
