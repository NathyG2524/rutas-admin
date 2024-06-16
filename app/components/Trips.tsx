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
    error,
  } = useGetTripsQuery({});

  const [deleteTrip] = useDeleteTripMutation();

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = (
      <div className="grid  sm:grid-cols-2 gap-4 lg:gap-8 m-auto">
        {trips.items?.map((trip: { id: React.Key | null | undefined; coverPhoto: { filename: any; }[]; title: String; price: number; startedDate: any; numberOfDays: number; description: String; }) => (
          <div key={trip.id} className="flex flex-col">
            <div>
              <Link href={`/EditTrip/${trip.id}`}>
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => deleteTrip({ id: trip.id })}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              > 
                Delete
              </button>
            </div>
            <Link href={`/UpcomingTrips/${trip.id}`}>
              <div>
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
    // content = <p>{error}</p>;
  }

  return (
    <>
      <div className="flex flex-col   lg:gap-6 mt-8">
        <div className="justify-self-center m-auto">
          <h2 className="text-4xl font-medium capitalize pb-8">Trips</h2>
        </div>
        <div className="m-auto">{content}</div>
      </div>
    </>
  );
};

export default Trips;
