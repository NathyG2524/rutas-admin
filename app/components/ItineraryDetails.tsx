import React, { useState } from 'react';
import { useEffect } from 'react';


const ItineraryDetails = (props: any) => {
    const [selectedTab, setSelectedTab] = React.useState(props.Days.length === 0 ? {} : props.Days[0]);
    const [isClicked, setIsClicked] = useState(selectedTab.id);

    const handleClick = (day: any) => {
        setSelectedTab(day);
        
    };
    
    const handleTabClick = (id: string) => {
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
            <h1 className='m-auto text-gray-950	text-2xl '>Itinerary Details</h1>
            <div className='flex flex-row w-8/12 m-auto gap-4 bg-white drop-shadow-xl'>
                <div className='flex flex-col bg-gray-200 basis-1/3 py-4  overflow-y-auto h-52'>
                    {
                        props.Days.map((day: any) => (
                            <div
                                key={day.id}
                                onClick={() => {
                                    handleClick(day);
                                    handleTabClick(day.id);
                                }} className={`flex p-2 gap-2 border-b-1 border-black ${isClicked === day.id ? 'bg-orange-400' : 'bg-gray-200'} `} >
                                <div className='cursor-pointer'>{day.route}</div>
                                <div>{day.value}</div>
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-col gap-4 basis-2/3 m-auto drop-shadow-xl' >
                    <div className='m-auto'>{selectedTab.value}</div>
                    <div className='p-4'>{selectedTab.description}</div>
                </div>

            </div>
        </div>
    )
}
export default ItineraryDetails