"use client"
import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import countries from '../../data/countries.json';
import ItineraryDetails from './Upcoming/ItineraryDetails';

interface Journey {
    value: string;
    key: string;
}

const Journeys: Journey[] = [
    { value: 'Bus', key: "1" },
    { value: 'Flight', key: "2" },
    { value: 'Train', key: "3" },
    { value: 'Ship', key: "4" },
]

const EditTrip: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [selectedFiles1, setSelectedFiles1] = useState<File[]>([]);
    const [selectedJourney, setSelectedJourney] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [totalDays, setTotalDays] = useState<number>(0);
    const [map, setMap] = useState<string>('');
    const [days, setDays] = useState<string>('');
    const [place, setPlace] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [ItineraryBody, setItineraryBody] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [draft, setDraft] = useState<boolean>(false);
    const [isItineraryDeleted, setIsItineraryDeleted] = useState<boolean>(false);
    const [Days, setADays] = useState<any[]>([]);
    const [editItinerary, setEditItinerary] = useState<number>(1);

    const handleFileInput1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setSelectedFiles1(Array.from(e.target.files));
    };

    // Other event handlers...

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        // Populate formData with data...

        try {
            const res1 = await axios.post('http://localhost:3000/upcoming-trips/', formData);
            // Handle response...
        } catch (error) {
            // Handle error...
        }
    };

    return (
        <>
        <p>hello</p>
            {/* JSX structure */}
        </>
    );
}

export default EditTrip;
