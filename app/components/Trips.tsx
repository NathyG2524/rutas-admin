import * as React from "react";
import Link from "next/link";
import { useDeleteTripMutation, useGetTripsQuery } from "../../features/api/apiSlice";
import Loading from "./Loading";
import { UpcomingCards } from "./Upcoming/TripCard";

const Trips: React.FC = () => {
  const {
    data: trips,
    isLoading,
    isSuccess,
    isError,
  } = useGetTripsQuery({});

  const [deleteTrip] = useDeleteTripMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteTrip({ id }).unwrap();
    } catch (error) {
      console.error("Failed to delete trip:", error);
    }
  };

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = (
      <div className="grid sm:grid-cols-2 gap-4 lg:gap-8 m-auto">
        {trips.items?.map((trip: { 
          id: string;
          coverPhoto: { filename: string }[];
          title: string;
          price: number;
          startedDate: string;
          numberOfDays: number;
          description: string;
        }) => (
          <div key={trip.id} className="flex flex-col bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between mb-2">
              <Link href={`/EditTrip/${trip.id}`}>
                <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(trip.id)}
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
            <Link href={`/UpcomingTrips/${trip.id}`}>
              <div className="cursor-pointer">
                <UpcomingCards
                  Image={trip.coverPhoto[0]?.filename}
                  Title={trip.title}
                  Price={trip.price}
                  StartDate={trip.startedDate}
                  NumberOfDays={trip.numberOfDays}
                  Description={trip.description}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  } else if (isError) {
    content = <p className="text-red-500 text-center">Failed to load trips.</p>;
  }

  return (
    <div className="flex flex-col lg:gap-6 mt-8">
      <div className="flex justify-between items-center m-auto w-full max-w-4xl">
        <h2 className="text-4xl font-medium capitalize pb-4">Trips</h2>
        {/* <Link href="/AddTrip">
          <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition">
            Add Trip
          </button>
        </Link> */}
      </div>
      <div className="m-auto w-full max-w-4xl">{content}</div>
    </div>
  );
};

export default Trips;
