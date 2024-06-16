"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";
import { useGetTripsQuery } from "../../../features/api/apiSlice";
import axios from "axios";


interface Card {
  Image : any,
  Title : String,
  Price : number,
  StartDate : any,
  NumberOfDays: number,
  Description : String,
}
export function UpcomingCards(prop: Card) {
  const [cover, setCover] = useState("");

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `http://93.127.163.40:4000/upcoming-trips/download/${prop.Image}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setCover(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  const description = prop.Description?.slice(0, 70);

  const date = new Date(`${prop.StartDate}`);

  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const endDate = (startDate: string, numberOfDays: number) => {
    const date = new Date(`${startDate}`);
    date.setDate(date.getDate() + numberOfDays);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  

  useEffect(() => {
    handleDownload();
  }, []);

  
 
  return (
    <CardContainer className="inter-var  max-w-96 mt-0 bg-black">
      <CardBody className=" shadow-md shadow-gray-100 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-[500px] rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-white tracking-wide uppercase dark:text-white"
        >
          {prop.Title} <span className="text-sm  capitalize font-light text-green-500">{description}...</span> 
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {formattedDate} - {endDate(prop.StartDate, prop.NumberOfDays)} ({prop.NumberOfDays} Days)
            <br />Price: {prop.Price} USD
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={cover}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-10">
          <CardItem
            translateZ={20}
            as={Link}
            href="https://twitter.com/mannupaaji"
            target="__blank"
            className="px-4 py-2 rounded-xl text-white text-xs font-normal dark:text-white"
          >
            See Trip →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black border border-white dark:bg-white dark:text-black text-white text-xs font-bold"
          >
           Reserve
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
