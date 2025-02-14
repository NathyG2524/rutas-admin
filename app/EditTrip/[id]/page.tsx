'use client'
import * as React from "react";
import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { DateInput, DatePicker } from "@mantine/dates";
import { Select, TextInput, NumberInput, FileInput, Button, Textarea } from "@mantine/core";
import countries from "../../../data/countries.json";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import "dayjs/locale/en";

const Journeys = [
  { value: "Bus", label: "Bus" },
  { value: "Flight", label: "Flight" },
  { value: "Train", label: "Train" },
  { value: "Ship", label: "Ship" },
];

interface Day {
  route: string;
  value: string;
  description: string;
  id: string;
}

const EditTrip = () => {
  const { id } = useParams(); // Get the trip ID from the URL
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFiles1, setSelectedFiles1] = useState<File[]>([]);
  const [daysList, setDaysList] = useState<Day[]>([]);
  const [editItinerary, setEditItinerary] = useState<string>("");
  const [draft, setDraft] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const form = useForm({
    initialValues: {
      title: "",
      price: 0,
      journey: "",
      country: "",
      date: null as Date | null,
      totalDays: 0,
      map: "",
      days: "",
      place: "",
      itineraryBody: "",
      description: "",
    },
    validate: {
      title: (value) => (value.trim() ? null : "Title is required"),
      price: (value) => (value > 0 ? null : "Price must be greater than 0"),
      journey: (value) => (value ? null : "Journey type is required"),
      country: (value) => (value ? null : "Country is required"),
      date: (value) => (value ? null : "Date is required"),
      totalDays: (value) => (value > 0 ? null : "Total days must be greater than 0"),
      map: (value) => (value.trim() ? null : "Map link is required"),
    },
  });

  // Fetch existing trip data
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`http://93.127.163.40:4000/upcoming-trips/${id}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        const trip = res.data;

        // Populate form fields with fetched data
        form.setValues({
          title: trip.title,
          price: trip.price,
          journey: trip.journey,
          country: trip.country,
          date: new Date(trip.startedDate), // Convert string to Date object
          totalDays: trip.numberOfDays,
          map: trip.location,
          description: trip.description,
        });

        // Populate itinerary details
        if (trip.itineraryDetails) {
          setDaysList(trip.itineraryDetails);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching trip data", error);
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  const handleFileInput = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleFileInput1 = (files: File[]) => {
    setSelectedFiles1(files);
  };

  const handleEditItinerary = (id: string) => {
    const itineraryForm = daysList.find((x) => x.id === id);
    if (itineraryForm) {
      setDraft(true);
      form.setValues({
        days: itineraryForm.route,
        place: itineraryForm.value,
        itineraryBody: itineraryForm.description,
      });
      setEditItinerary(id);
    }
  };

  const handleItineraryDelete = (id: string) => {
    setDaysList(daysList.filter((x) => x.id !== id));
    if (editItinerary === id) {
      setEditItinerary("");
      setDraft(false);
    }
  };

  const handleItineraryChange = () => {
    const newDay: Day = {
      route: form.values.days,
      value: form.values.place,
      description: form.values.itineraryBody,
      id: draft ? editItinerary : uuidv4(),
    };

    if (draft) {
      setDaysList(daysList.map((day) => (day.id === editItinerary ? newDay : day)));
      setDraft(false);
      setEditItinerary("");
    } else {
      setDaysList([...daysList, newDay]);
    }

    // Reset itinerary input fields
    form.setValues({
      days: "",
      place: "",
      itineraryBody: "",
    });
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("title", form.values.title);
    formData.append("price", form.values.price.toString());
    formData.append("journey", form.values.journey);
    if (form.values.date) {
      formData.append("startedDate", form.values.date.toISOString());
    }
    formData.append("numberOfDays", form.values.totalDays.toString());
    formData.append("location", form.values.map);
    formData.append("itineraryDetails", JSON.stringify(daysList));
    formData.append("description", form.values.description);

    selectedFiles1.forEach((file) => formData.append("photos", file));
    selectedFiles.forEach((file) => formData.append("coverPhoto", file));

    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.put(`http://93.127.163.40:4000/upcoming-trips/${id}`, formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Update successful", res);
      router.push("/dashboard"); // Redirect to trips page after successful update
    } catch (error) {
      console.error("Error updating data", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-auto flex flex-col gap-4 w-8/12 my-4">
      <h2 className="text-4xl font-medium capitalize pb-4 m-auto">Edit Trip</h2>
      <form onSubmit={form.onSubmit(handleUpdate)} className="flex flex-col gap-8 m-auto w-11/12">
        <TextInput
          label="Title"
          placeholder="Enter Title"
          {...form.getInputProps("title")}
        />
        <NumberInput
          label="Price"
          placeholder="Enter Price"
          {...form.getInputProps("price")}
        />
        <Select
          label="Journey"
          placeholder="Select Journey"
          data={Journeys}
          {...form.getInputProps("journey")}
        />
        <DateInput
          label="Starting Date"
          placeholder="Select Starting Date"
          minDate={new Date()}
          value={form.values.date}
          onChange={(date) => form.setFieldValue("date", date)}
        />
        <NumberInput
          label="Total Days"
          placeholder="Enter Total Days"
          {...form.getInputProps("totalDays")}
        />
        <Select
          label="Country"
          placeholder="Select Country"
          data={countries.map((country:any) => ({ value: country.name, label: country.name }))}
          {...form.getInputProps("country")}
        />
        <TextInput
          label="Map Link"
          placeholder="Enter Map Link"
          {...form.getInputProps("map")}
        />
        <FileInput
          label="Cover Photo"
          multiple
          onChange={handleFileInput}
        />
        <FileInput
          label="Photos"
          multiple
          onChange={handleFileInput1}
        />
        <TextInput
          label="Days"
          placeholder="Enter Days"
          {...form.getInputProps("days")}
        />
        <TextInput
          label="Place"
          placeholder="Enter Place"
          {...form.getInputProps("place")}
        />
        <Textarea
          label="Itinerary Body"
          placeholder="Enter Itinerary"
          {...form.getInputProps("itineraryBody")}
        />
        <Textarea
          label="Description"
          placeholder="Enter Description"
          {...form.getInputProps("description")}
        />
        <div className="flex gap-4">
          <Button
            type="button"
            onClick={handleItineraryChange}
            color={draft ? "blue" : "green"}
          >
            {draft ? "Edit Itinerary" : "Add Itinerary"}
          </Button>
          {draft && (
            <Button
              type="button"
              onClick={() => handleItineraryDelete(editItinerary)}
              color="red"
            >
              Delete Itinerary
            </Button>
          )}
        </div>
        {daysList.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-medium leading-6 text-gray-900">Itinerary List</h3>
            <ul>
              {daysList.map((day) => (
                <li key={day.id} className="mt-2">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-semibold">{day.route}:</span> {day.value} - {day.description}
                    </div>
                    <Button
                      type="button"
                      onClick={() => handleEditItinerary(day.id)}
                      variant="subtle"
                    >
                      Edit
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Button type="submit" color="green">
          Update Trip
        </Button>
      </form>
    </div>
  );
};

export default EditTrip;