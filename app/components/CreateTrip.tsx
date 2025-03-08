import * as React from "react";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { DateInput, DatePicker } from "@mantine/dates";
import '@mantine/dates/styles.css';
import { Select, TextInput, NumberInput, FileInput, Button, Textarea, Text, Notification } from "@mantine/core";
import countries from "../../data/countries.json";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "dayjs/locale/en"; // Import locale if needed
// import { notifications } from "@mantine/notifications";


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

const CreateTrip = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFiles1, setSelectedFiles1] = useState<File[]>([]);
  const [daysList, setDaysList] = useState<Day[]>([]);
  const [editItinerary, setEditItinerary] = useState<string>("");
  const [draft, setDraft] = useState<boolean>(false);

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
      body: "",
      description: "",
      aboutPayment: '',
      aboutTour: '',
      itineraryBody: '',
      totalSeats: 0,
      // seatsLeft: 0
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

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("title", form.values.title);
    formData.append("price", form.values.price.toString());
    formData.append("journey", form.values.journey);
    formData.append("startedDate", form.values.date?.toISOString() || "");
    formData.append("numberOfDays", form.values.totalDays.toString());
    formData.append("numberOfSeats", form.values.totalSeats?.toString());
    formData.append("seatsLeft", form.values.totalSeats?.toString());
    formData.append("location", form.values.map);
    formData.append("itineraryDetails", JSON.stringify(daysList));
    formData.append("description", form.values.title);
    formData.append("body", form.values.title);
    formData.append("aboutPayment", JSON.stringify(daysList));
    formData.append("aboutTour", JSON.stringify(daysList));

    selectedFiles1.forEach((file) => formData.append("photos", file));
    selectedFiles.forEach((file) => formData.append("coverPhoto", file));

    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.post("https://api.rutasdeserendipia.com/upcoming-trips/", formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload successful", res);
      // showNotification({
      //   title: "Success",
      //   message: "Trip uploaded successfully!",
      //   color: "green",
      // });
    } catch (error) {
      console.error("Error uploading data", error);
      // showNotification({
      //   title: "Error",
      //   message: "Failed to upload trip. Please try again.",
      //   color: "red",
      // });
    }
  };

  return (
    <div className="m-auto flex flex-col gap-4 w-8/12 my-4">
      <h2 className="text-4xl font-medium capitalize pb-4 m-auto">Upload Trips</h2>
      <form onSubmit={form.onSubmit(handleUpload)} className="flex flex-col gap-8 m-auto w-11/12">
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
          {...form.getInputProps("date")}
        />
        <NumberInput
          label="Total Days"
          placeholder="Enter Total Days"
          {...form.getInputProps("totalDays")}
        />
        <NumberInput
          label="Total Seats"
          placeholder="Enter Total Seats"
          {...form.getInputProps("totalSeats")}
        />
        <Select
          label="Country"
          placeholder="Select Country"
          data={countries.map((country) => ({ value: country.name, label: country.name }))}
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
        <Text fw={600} size='lg' className="text-center">Itinerary Detail</Text>
        <TextInput
          label="Days (Route)"
          placeholder="Enter Route"
          {...form.getInputProps("days")}
        />
        <TextInput
          label="Place"
          placeholder="Enter Place"
          {...form.getInputProps("place")}
        />
        <Textarea
          label="Itinerary Body"
          placeholder="Enter Description"
          {...form.getInputProps("itineraryBody")}
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
          Upload
        </Button>
      </form>
    </div>
  );
};

export default CreateTrip;