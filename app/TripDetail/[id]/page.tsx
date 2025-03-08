'use client'

import { useGetReserveListQuery } from "@/store/rutas.api"
import { Container } from "@mantine/core"
import { IconArrowBack } from "@tabler/icons-react"
import { useParams, useRouter } from "next/navigation"

const TripDetail = () =>{
    const {id} = useParams()
    const router = useRouter()
    const {data} = useGetReserveListQuery(id)
    console.log(data)
    return(
        <Container size='lg'>
             <div className="mt-6">
      <div className="flex gap-5">
    <IconArrowBack className="cursor-pointer" onClick={() => router.back()} />
        <h2 className="text-3xl font-semibold text-gray-800 border-b pb-3 mb-4">Request List</h2>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.total ? 
        data?.items?.map((item: { id: string; fullName: string; lastName:string; description: string; phoneNumber: string; upcomingTripId:string; numberOfPeople:string }) => (
          <div key={item.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold">{item.fullName}  </h2>
            {/* <p className="text-sm text-gray-600">{item.description}</p> */}
            <p className="text-lg text-gray-600 mt-2"> <strong>Phone Number</strong> :{item.phoneNumber} </p>
            {/* <p className="text-lg text-gray-600 mt-2"> <strong>Number of days</strong> :{item.numberOfDays} </p>
            <p className="text-lg text-gray-600 mt-2"><strong> Number of peoples</strong> :{item.numberOfPeople} </p> */}
            <a className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" href={`./${item.upcomingTripId}/${item.id}`}>
              View Details
            </a>
          </div>
        )) : 'No Reserve Request' 
         }
        
      </div>
    </div>
        </Container>
    )
} 

export default TripDetail