import * as React from "react";
import { useState, ChangeEvent, FormEvent } from "react";
import countries from "../../data/countries.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import ItineraryDetails from "./Upcoming/ItineraryDetails";

// import Days from '../Upcoming/Itineray';

const Journeys = [
  { value: "Bus", key: "1" },
  { value: "Flight", key: "2" },
  { value: "Train", key: "3" },
  { value: "Ship", key: "4" },
];

interface Day {
  route: string;
  value: string;
  description: string;
  id: string;
}

const CreateTrip = () => {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [selectedFiles1, setSelectedFiles1] = useState<FileList | null>(null);

  const [selectedJourney, setSelectedJourney] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [totalDays, setTotalDays] = useState<number>(0);
  const [map, setMap] = useState<string>("");

  const [days, setDays] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [itineraryBody, setItineraryBody] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [draft, setDraft] = useState<boolean>(false);
  const [isItineraryDeleted, setIsItineraryDeleted] = useState<boolean>(false);

  const [daysList, setDaysList] = useState<Day[]>([]);

  const [editItinerary, setEditItinerary] = useState<string>("");

  const handleFileInput1 = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles1(e.target.files);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleEditItinerary = (value: string) => {
    setEditItinerary(value);
  };

  const handleFormItinerary = () => {
    const itineraryForm = daysList.find((x) => x.id === editItinerary);

    if (itineraryForm) {
      setDraft(true);
      setDays(itineraryForm.route);
      setPlace(itineraryForm.value);
      setItineraryBody(itineraryForm.description);
      setId(itineraryForm.id);
    } else {
      console.error(`No itinerary found with id ${editItinerary}`);
    }
  };

  const handleItineraryDelete = () => {
    setDaysList(daysList.filter((x) => x.id !== editItinerary));
    setIsItineraryDeleted(true);
  };

  const handleItineraryChange = () => {
    const newDay: Day = {
      route: days,
      value: place,
      description: itineraryBody,
      id: draft ? editItinerary : uuidv4(),
    };

    if (draft) {
      setDaysList(daysList.map((day) => (day.id === editItinerary ? newDay : day)));
    } else {
      setDaysList([...daysList, newDay]);
    }
    setDraft(false);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleJourney = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedJourney(e.target.value);
  };

  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("price", price.toString());
    formData.append("journey", selectedJourney);
    formData.append("startedDate", selectedDate?.toISOString() || "");
    formData.append("numberOfDays", totalDays.toString());
    formData.append("location", map);

    formData.append("itineraryDetails", JSON.stringify(daysList));
    formData.append("description", description);
    formData.append("body", description);
    formData.append("aboutPayment", "body");
    formData.append("aboutTour", "body");

    if (selectedFiles1) {
      for (let i = 0; i < selectedFiles1.length; i++) {
        formData.append("photos", selectedFiles1[i]);
      }
    }

    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("coverPhoto", selectedFiles[i]);
      }
    }

    try {
      const res = await axios.post("http://93.127.163.40:4000/upcoming-trips/", formData);
      console.log("Upload successful", res);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  return (
    <>
      <div className="m-auto flex flex-col gap-4 w-8/12 my-4 ">
        <h2 className="text-4xl font-medium capitalize pb-4 m-auto">Upload Trips</h2>
        <div className="flex flex-col gap-8 m-auto w-11/12 md:flex-row sm:flex-row">
          <div className="w-full sm:col-span-3">
            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
              Title
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                name="title"
                id="title"
                placeholder="Enter Title"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="w-full sm:col-span-3">
            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
              Price
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setPrice(Number(e.target.value))}
                value={price}
                type="number"
                name="price"
                id="price"
                placeholder="Enter Price"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="w-full sm:col-span-3">
            <label htmlFor="journey" className="block text-sm font-medium leading-6 text-gray-900">
              Journey
            </label>
            <select
              value={selectedJourney}
              onChange={handleJourney}
              className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              {Journeys.map((journey) => (
                <option key={journey.key} value={journey.value}>
                  {journey.value}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:col-span-3">
            <label htmlFor="start-Date" className="block text-sm font-medium leading-6 text-gray-900">
              Starting Date
            </label>
            <div className="block w-full mt-2 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                showTimeSelect
                minDate={tomorrow}
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full"
                placeholderText="Select Starting Date"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 m-auto w-11/12 md:flex-row sm:flex-row">
          <div className="w-full sm:col-span-3">
            <label htmlFor="total-days" className="block text-sm font-medium leading-6 text-gray-900">
              Total Days
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setTotalDays(Number(e.target.value))}
                value={totalDays}
                type="number"
                name="total-days"
                id="total-days"
                placeholder="Enter Total Days"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="w-full sm:col-span-3">
            <label htmlFor="place" className="block text-sm font-medium leading-6 text-gray-900">
              Place
            </label>
            <select
              value={selectedCountry}
              onChange={handleCountryChange}
              className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              {countries.map((country: any) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:col-span-3">
            <label htmlFor="Map" className="block text-sm font-medium leading-6 text-gray-900">
              Map
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setMap(e.target.value)}
                value={map}
                type="text"
                name="Map"
                id="Map"
                placeholder="Enter map link"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 m-auto w-11/12 md:flex-row sm:flex-row">
          <div className="w-full sm:col-span-3">
            <label htmlFor="coverPhoto" className="block text-sm font-medium leading-6 text-gray-900">
              Cover Photo
            </label>
            <input
              type="file"
              onChange={handleFileInput}
              className="block w-full mt-2 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="w-full sm:col-span-3">
            <label htmlFor="photos" className="block text-sm font-medium leading-6 text-gray-900">
              Photos
            </label>
            <input
              type="file"
              onChange={handleFileInput1}
              multiple
              className="block w-full mt-2 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 m-auto w-11/12">
          <div className="w-full sm:col-span-3">
            <label htmlFor="days" className="block text-sm font-medium leading-6 text-gray-900">
              Days
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setDays(e.target.value)}
                value={days}
                type="text"
                name="days"
                id="days"
                placeholder="Enter days"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="w-full sm:col-span-3">
            <label htmlFor="place" className="block text-sm font-medium leading-6 text-gray-900">
              Place
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setPlace(e.target.value)}
                value={place}
                type="text"
                name="place"
                id="place"
                placeholder="Enter place"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="w-full sm:col-span-3">
            <label htmlFor="itineraryBody" className="block text-sm font-medium leading-6 text-gray-900">
              Itinerary Body
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setItineraryBody(e.target.value)}
                value={itineraryBody}
                type="text"
                name="itineraryBody"
                id="itineraryBody"
                placeholder="Enter Itinerary"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleItineraryChange}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            {draft ? "Edit Itinerary" : "Add Itinerary"}
          </button>
          {draft && (
            <button
              onClick={handleItineraryDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              Delete Itinerary
            </button>
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
                    <button
                      onClick={() => handleEditItinerary(day.id)}
                      className="ml-2 text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-4 mt-8">
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateTrip;
