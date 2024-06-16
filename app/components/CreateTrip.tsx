import * as React from "react";
import { useState } from "react";
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

const CreateTrip = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFiles1, setSelectedFiles1] = useState([]);

  const [selectedJourney, setSelectedJourney] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [totalDays, setTotalDays] = useState(0);
  const [map, setMap] = useState("");

  const [days, setDays] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");

  const [ItineraryBody, setItineraryBody] = useState("");
  const [id, setId] = useState("");
  const [draft, setDraft] = useState(false);
  const [isItineraryDeleted, setIsItineraryDeleted] = useState(false);

  const [Days, setADays] = useState([]);

  const [editItinerary, setEditItinerary] = useState(1);

  const handleFileInput1 = (e: any) => {
    setSelectedFiles1(e.target.files);
  };

  const handleFileInput = (e: any) => {
    setSelectedFiles(e.target.files);
  };

  const handleEditItinerary = (value: any) => {
    setEditItinerary(value);
  };

  const handleFormItinerary = () => {
    const ItineraryForm: { route: string; value: string; description: string; id: string } = Days.find((x: any) => x.id === editItinerary);
    setDraft(true);
    setDays(ItineraryForm.route);
    setPlace(ItineraryForm.value);
    setItineraryBody(ItineraryForm.description);
    setId(ItineraryForm.id);
  };

  const handleItineraryDelete = () => {
    Days.splice(
      Days.findIndex((x: any) => x.id === editItinerary),
      1
    );
    setIsItineraryDeleted(true);
  };
  const handleItineraryChange = () => {
    if (draft) {
      let Day = {
        route: days,
        value: place,
        description: ItineraryBody,
        id: editItinerary,
      };
      Days[Days.findIndex((x: any) => x.id === editItinerary)] = Day;
    } else {
      let Day = {
        route: days,
        value: place,
        description: ItineraryBody,
        id: uuidv4(),
      };
      setADays([...Days, Day]);
    }
    setDraft(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleJourney = (e) => {
    setSelectedJourney(e.target.value);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("price", price);
    formData.append("journey", selectedJourney);
    // formData.append('selectedCountry', selectedCountry)
    formData.append("startedDate", selectedDate.toISOString());
    formData.append("numberOfDays", totalDays);
    formData.append("location", map);

    formData.append("itineraryDetails", JSON.stringify(Days));
    formData.append("description", description);
    formData.append("body", description);
    formData.append("aboutPayment", "body");
    formData.append("aboutTour", "body");
    // console.log(formData)

    for (let i = 0; i < selectedFiles1.length; i++) {
      formData.append("photos", selectedFiles1[i]);
    }

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("coverPhoto", selectedFiles[i]);
    }

    const res1 = await axios.post(
      "http://93.127.163.40:4000/upcoming-trips/",
      formData
    );
  };
  return (
    <>
      <div className="m-auto flex flex-col gap-4 w-8/12 my-4 ">
        {/* <h1 className="m-auto py-4 text-2xl font-medium leading-6 text-gray-900">
          Upload Trip
        </h1> */}
        <h2 class="text-4xl font-medium capitalize pb-4 m-auto">Upload Trips</h2>
        <div className="flex flex-col gap-8 m-auto w-11/12 md:flex-row sm:flex-row">
          <div className="w-full sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                name="title"
                placeholder="Enter Title"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="w-full sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Price
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                type="text"
                name="price"
                id="price"
                placeholder="Enter Price"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="w-full sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Journey
            </label>
            <select
              value={selectedJourney}
              onChange={handleJourney}
              className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              {Journeys.map((Journey) => (
                <option key={Journey.key} value={Journey.value}>
                  {Journey.value}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:col-span-3">
            <label
              htmlFor="start-Date"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
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
                dateFormat="Pp"
                placeholderText="Select date and time"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 m-auto w-11/12 md:flex-row sm:flex-row">
          <div className="w-full sm:col-span-3">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Where are you from?
            </label>
            <select
              value={selectedCountry}
              onChange={handleCountryChange}
              className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Map Location
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setMap(e.target.value)}
                value={map}
                type="text"
                name="location"
                id="location"
                placeholder="Enter google map link "
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="w-full sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Number of Days
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setTotalDays(e.target.value)}
                value={totalDays}
                type="text"
                name="number-of-days"
                id="number-of-days"
                placeholder="Enter number of days"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 m-auto w-11/12 md:flex-row sm:flex-row">
          <div className="flex flex-col m-auto justify-center m-2 sm:w-full md:w-full">
            <label
              htmlFor="description"
              className="block py-2 text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="h-32 px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
              placeholder="Enter description"
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 m-auto w-11/12 md:flex-row sm:flex-row">
          {/* <div className="flex flex-col m-auto justify-center m-2 sm:w-full md:w-full">
                        <label htmlFor="first-name" className="block py-2 text-sm font-medium leading-6 text-gray-900">
                            Body
                        </label>
                        <textarea
                            className="h-32 px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
                            placeholder="Enter text"
                        />
                    </div> */}
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="file1"
            >
              Select photos:
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="f1"
              type="file"
              id="file1"
              multiple
              onChange={handleFileInput1}
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 m-auto w-11/12 md:flex-row sm:flex-row">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="file1"
            >
              Select cover photo:
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="f1"
              type="file"
              id="file1"
              onChange={handleFileInput}
            />
          </div>
        </div>
        {Days.length !== 0 && (
          <div className="flex flex-col  m-auto  w-8/12 p-2 md:flex-row sm:flex-row">
            <ItineraryDetails
              Days={Days}
              onChildValue={handleEditItinerary}
              isDelete={isItineraryDeleted}
            />
            <button
              onClick={handleFormItinerary}
              className="m-auto w-full h-5/6  sm:w-full  md:w-1/2 lg:w-1/3 xl:w-1/4 bg-emerald-400 hover:bg-emerald-100 active:bg-emerald-400 text-white sm:bg-emerald-400 font-medium py-3 px-6 rounded-lg shadow-lg transition duration-300 transform-gpu hover:shadow-md active:translate-y-1"
            >
              Edit
            </button>
            <button
              onClick={handleItineraryDelete}
              className="m-auto w-full h-5/6  sm:w-full  md:w-1/2 lg:w-1/3 xl:w-1/4 bg-emerald-400 hover:bg-emerald-100 active:bg-emerald-400 text-white sm:bg-emerald-400 font-medium py-3 px-6 rounded-lg shadow-lg transition duration-300 transform-gpu hover:shadow-md active:translate-y-1"
            >
              Delete
            </button>
          </div>
        )}

        <div className="flex flex-col gap-8 m-auto w-11/12 md:flex-row sm:flex-row">
          <div className="flex flex-col gap-8 m-auto w-11/12  md:flex-col sm:flex-col">
            <div className="flex-col gap-8 sm:flex-row md:flex">
              <div className="w-full sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Days
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setDays(e.target.value)}
                    value={days}
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    placeholder="Enter number of days"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="w-full sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Place
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setPlace(e.target.value)}
                    value={place}
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    placeholder="Enter number of days"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col m-auto justify-center m-2 sm:w-full md:w-full">
              <label
                htmlFor="first-name"
                className="block py-2 text-sm font-medium leading-6 text-gray-900"
              >
                Body
              </label>
              <textarea
                onChange={(e) => setItineraryBody(e.target.value)}
                value={ItineraryBody}
                className="h-32 px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
                placeholder="Enter text"
              />
            </div>
          </div>
          <button
            onClick={handleItineraryChange}
            className="m-auto w-9/12 h-1/6  sm:w-full  md:w-1/2 lg:w-1/3 xl:w-1/4 bg-emerald-400 hover:bg-emerald-100 active:bg-emerald-400 text-white sm:bg-emerald-400 font-medium py-3 px-6 rounded-lg shadow-lg transition duration-300 transform-gpu hover:shadow-md active:translate-y-1"
          >
            Add
          </button>
        </div>
        <button
          onClick={handleUpload}
          className="m-auto w-9/12 h-5/6  sm:w-full  md:w-1/2 lg:w-1/3 xl:w-1/4 bg-emerald-400 hover:bg-emerald-100 active:bg-emerald-400 text-white sm:bg-emerald-400 font-medium py-3 px-6 rounded-lg shadow-lg transition duration-300 transform-gpu hover:shadow-md active:translate-y-1"
        >
          Upload
        </button>
      </div>
    </>
  );
};

export default CreateTrip;