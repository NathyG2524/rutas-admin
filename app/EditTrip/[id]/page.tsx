'use client'
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetTripQuery, useUpdateTripMutation } from '../../../store/rutas.api';
import Loading from "../../components/Loading";

const EditTrip = () => {
  const router = useRouter();
  const { id } = useParams();

  const { data: trip, isLoading, isError } = useGetTripQuery(id, {
    skip: !id, // Avoid running query when `id` is undefined
  });

  const [updateTrip] = useUpdateTripMutation();
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    startedDate: "",
    numberOfDays: 0,
    description: "",
  });

  useEffect(() => {
    if (trip) {
      setFormData({
        title: trip.title || "",
        price: trip.price || 0,
        startedDate: trip.startedDate || "",
        numberOfDays: trip.numberOfDays || 0,
        description: trip.description || "",
      });
    }
  }, [trip]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateTrip({ id, ...formData }).unwrap(); // Spread `formData` instead of nesting
      router.push("/"); // Redirect after successful update
    } catch (error) {
      console.error("Update failed:", error);
    }
  };
  
  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Failed to load trip data.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit Trip</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="block">
          <span className="text-gray-700">Title:</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Price:</span>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Start Date:</span>
          <input
            type="date"
            name="startedDate"
            value={formData.startedDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Number of Days:</span>
          <input
            type="number"
            name="numberOfDays"
            value={formData.numberOfDays}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Description:</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditTrip;
