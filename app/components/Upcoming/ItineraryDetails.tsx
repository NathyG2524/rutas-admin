import React, { useState } from 'react';
import { useEffect } from 'react';


const ItineraryDetails = (props: any) => {
    const [selectedTab, setSelectedTab] = React.useState(props.Days.length === 0 ? {} : props.Days[0]);
    const [isClicked, setIsClicked] = useState(selectedTab.id);

    const handleClick = (day: any) => {
        setSelectedTab(day);
        
    };
    
    const handleTabClick = (id: any) => {
        setIsClicked(id);
        props.onChildValue(id)
    };

    useEffect(() => {
        if (props.Days.length === 1) {
            setSelectedTab(props.Days[0]);
            setIsClicked(props.Days[0].id);
        }
    }, [props.Days, props.isDelete])
    return (
        <div className='flex flex-col gap-6 m-auto min-w-full'>
            <h1 className='m-auto text-gray-950 uppercase font-semibold	text-2xl '>Itinerary Details</h1>
            <div className='flex flex-row w-[80%] justify-center m-auto gap-4 bg-white'>
                <div className='flex flex-col bg-gray-200 basis-1/3  overflow-y-auto h-64 '>
                    {
                        props.Days.map((day: any) => (
                            <div
                                key={day.id}
                                onClick={() => {
                                    handleClick(day);
                                    handleTabClick(day.id);
                                }} className={`flex p-2 gap-2 border-b-1 border-black ${isClicked === day.id ? 'bg-[#28AC95] text-white' : 'bg-gray-200'} `} >
                                <div className='cursor-pointer'> Day {day.route}</div>
                                <div>{day.value}</div>
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-col basis-2/3  ml-14 ' >
                    <div className='text-[#28AC95] font-semibold '>Day {selectedTab.route}</div>
                    <div className='pt-1 pb-5'>{selectedTab.value}</div>
                    <div className=''>{selectedTab.description}</div>
                </div>

            </div>
        </div>
    )
}
export default ItineraryDetails