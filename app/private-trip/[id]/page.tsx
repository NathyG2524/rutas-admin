'use client';

import { useGetPrivateTripQuery } from "@/store/rutas.api";
import { useParams } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,Cell } from "recharts";

const PrivateTripPage = () => {
  const { id } = useParams();
  const { data: trips, isLoading, isError } = useGetPrivateTripQuery(id);

  
  
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
        <h2 className="text-3xl font-semibold text-gray-800 border-b pb-3 mb-4">Trip Request</h2>
        <p className="text-gray-500 mb-6">Personal details</p>
        <div className="space-y-4">
          {[
            { label: "Full Name", value: `${trips.firstName} ${trips.lastName}` },
            { label: "Traveling To", value: trips.where},
            { label: "Email Address", value: trips.email },
            { label: "Phone Number", value: trips.phoneNumber },
            { label: "Number of People", value: trips.numberOfPeople },
            // { label: "From", value: `${trips.country}, ${trips.travelCity}` },
            // { label: "To", value: `${trips.destinationCountry}, ${trips.departureCity}` },
            { label: "Total Days", value: `${trips.numberOfDays} days` },
            // { label: "Type", value: trips.tripType },
            { label: "Preferred Contact Method", value: trips.contactMethod },
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
              <p className="text-gray-600 font-medium">Description</p>
              <p className="text-gray-800">{trips.description}</p>
            </div>
          )}
    <div className="p-6 shadow-xl rounded-xl bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">Trip prioritize Summary</h2>
      
      <div className="w-full h-64 p-8">
      <ResponsiveContainer width="100%" height="100%">
  <BarChart data={chartData}>
    <XAxis dataKey="name" />
    <YAxis domain={[0, 5]} />
    <Tooltip />
    <Bar
      dataKey="value"
      radius={[1, 1, 0, 0]}
    >
      {chartData.map((entry, index) => (
        <Cell key={index} fill={categoryColors[entry.name] || "#CCCCCC"} />
      ))}
    </Bar>
  </BarChart>
</ResponsiveContainer>

      </div>
    </div>

        </div>
      </div>
    </div>
  );
};

export default PrivateTripPage;