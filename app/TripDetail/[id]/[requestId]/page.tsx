'use client';

import { useGetTripDetailQuery } from "@/store/rutas.api";
import { IconArrowBack } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";
import { Router } from "next/router";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,Cell } from "recharts";

const PrivateTripPage = () => {
  const { id,requestId } = useParams();
  const { data: trips, isLoading, isError } = useGetTripDetailQuery(requestId);
  const router = useRouter()
  
  
  const activities = 4
  const adventure = 5
  const spontaneity = 3
  const environment = 1
  
  
  const chartData: { name: keyof typeof categoryColors; value: number }[] = [
    { name: "Activities", value: activities },
    { name: "Adventure", value: adventure },
    { name: "Spontaneity", value: spontaneity },
    { name: "Environment", value: environment },
    
  ];
  const categoryColors = {
    Activities: "#4A90E2",
    Adventure: "#FF6B6B",
    Spontaneity: "#FFD166",
    Environment: "#06D6A0",
   
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading trip details...</p>
      </div>
    );
  }

  if (isError || !trips) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-500">Failed to load trip details.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-100">
      <div className="max-w-4xl bg-white w-full rounded-lg shadow-lg p-6">
        <div className="flex gap-5">
    <IconArrowBack className="cursor-pointer" onClick={() => router.back()} />
        <h2 className="text-3xl font-semibold text-gray-800 border-b pb-3 mb-4">Trip Request</h2>
        </div>
        <p className="text-gray-500 mb-6">Personal details</p>
        <div className="space-y-4">
          {[
            { label: "Full Name", value: `${trips.fullName}` },
            { label: "ID/NIE", value: `${trips.nieNumber}` },
            { label: "Phone Number", value: trips.phoneNumber },
            { label: "Email Address", value: trips.email },
            { label: "Birth Date", value: new Date(trips.birthDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },

            { label: "Traveled Before", value: trips.traveledBefore ? 'Yes' : 'No'},
            { label: "Medical Issue", value: trips.medicalIssues ? 'Yes' : 'No'},
            { label: "Medical Issue Detail ", value: trips.medicalIssuesDetails},
            { label: "Companion's Name ", value: trips.companion},
            { label: "understand our travel philosophy", value: trips.understandWayOfTravel ? 'Yes' :'No' },
            // { label: "Total Days", value: `${trips.numberOfDays} days` },
            // { label: "Preferred Contact Method", value: trips.preferredContact },
          ].map((item, index) => (
            <div
              key={index}
              className="md:grid md:grid-cols-2 hover:bg-gray-50 p-4 border rounded-lg"
            >
              <p className="text-gray-600 font-medium">{item.label}</p>
              <p className="text-gray-800">{item.value}</p>
            </div>
          ))}
          {trips.description && (
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 p-4 border rounded-lg">
              <p className="text-gray-600 font-medium">Other preferences</p>
              <p className="text-gray-800">{trips.description}</p>
            </div>
          )}
  

        </div>
      </div>
    </div>
  );
};

export default PrivateTripPage;