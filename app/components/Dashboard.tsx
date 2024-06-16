import * as React from "react";
// import { useForm, useState } from "react-hook-form";
import { useGetReportQuery } from "../../features/api/apiSlice";
import Loading from "./Loading";
// import dayjs from "dayjs";
import { CollectionQuery, Filter } from "@/shared/collection-query";
import { collectionQueryBuilder } from "@/shared/collection-query-builder";

const Dashboard = () => {
  // const [collectionQuery, setCollectionQuery] = React.useState<import("../../shared/collection-query").CollectionQuery>({
  //     skip: 0,
  //     top: 10,
  //   });
  const today = new Date(Date.now()).toISOString() 

let query : CollectionQuery = {};

query = {...query, filter:[
  [
    {
      field : "startedDate",
      operator  : ">=",
      value : `${today}`
    }
  ]
]}
  



query.count = true;

  const params : any = collectionQueryBuilder(query )
  const {
    data: trips,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetReportQuery(params);

 

  if (isLoading) {
    return <Loading  />;
  } else if (isError) {
    return ( <p>Something went wrong</p>);
  }
  return (
    <>
      {/* /* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <div className="m-auto w-full min-h-screen xl:w-[80%] 2xl:w-[85%]">
        <div className="px-16 w-full py-16  min-h-full 2xl:container">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 min-h-full">
            <div className="md:col-span-2 lg:col-span-1">
              <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
                <div>
                  <h5 className="text-xl font-bold text-gray-600 text-center">
                    Trips
                  </h5>
                  <div className="mt-2 flex justify-center gap-4">
                    <h3 className="text-3xl font-bold text-gray-700">
                      {trips?.totaltrips}
                    </h3>
                    
                  </div>
                    <span className="block text-center text-gray-500">
                    <p>Total trips </p> 
                  </span>
                  
                </div>
                <table className="w-full text-gray-600 pt-8">
                  <tbody>
                    <tr>
                      <td className="py-2">Upcoming Trips</td>
                      <td className="text-gray-500">{trips?.upcomingtrips}</td>
                      
                    </tr>
                    <tr>
                      <td className="py-2">Next week Trips</td>
                      <td className="text-green-500">{trips?.nextweektrips}</td>
                      
                    </tr>
                    
                  </tbody>
                </table>
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-1">
              <div className="lg:h-full py-8 px-6 text-gray-600 rounded-xl border border-gray-200 bg-white">
                <div className="">
                  <h5 className="text-xl font-bold text-gray-700 text-center">
                    Private Trips
                  </h5>
                  <div className="mt-2 flex justify-center gap-4">
                    <h3 className="text-3xl font-bold text-gray-700">{trips?.totalprivates}</h3>
                    
                  </div>
                  <span className="block text-center text-gray-500">
                    <p>Total request </p> 
                  </span>
                </div>
                <table className="mt-6 -mb-2 w-full text-gray-600">
                  <tbody>
                    <tr>
                    <td className="py-2">Upcoming Private Trips</td>
                      <td className="text-gray-500">{trips?.upcomingprivatetrips}</td>
                      
                     
                    </tr>
                    <tr>
                    <td className="py-2">Last week Request</td>

                      <td>
                    <div className="flex items-end gap-1 text-green-500">
                      <svg
                        className="w-3"
                        viewBox="0 0 12 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span><p>{trips?.lastweekrequest}</p></span>
                    </div>
                    </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
