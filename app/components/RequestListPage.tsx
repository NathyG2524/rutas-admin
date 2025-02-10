'use client'
import React from 'react';
import {   useGetPrivateTripsQuery } from '@/store/rutas.api';
// import {   useGetPrivateTripQuery } from '@/store/rutas.api';

const RequestListPage: React.FC = () => {
  const { data } =   useGetPrivateTripsQuery({});

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Request List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.items?.map((item: { id: string; firstName: string; lastName:string; description: string; travelCity: string; numberOfDays:string; numberOfPeople:string }) => (
          <div key={item.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold">{item.firstName}  {item.lastName}</h2>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-lg text-gray-600 mt-2"> <strong>destination city</strong> :{item.travelCity} </p>
            <p className="text-lg text-gray-600 mt-2"> <strong>Number of days</strong> :{item.numberOfDays} </p>
            <p className="text-lg text-gray-600 mt-2"><strong> Number of peoples</strong> :{item.numberOfPeople} </p>
            <a className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" href={`/private-trip/${item.id}`}>
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestListPage;
