// "use client"
// import React, { useState } from 'react';

// const Header = () => {
//     const [profileOpen, setProfileOpen] = useState(false);
//     const [asideOpen, setAsideOpen] = useState(true);

//     return (
//         <>
//             <header className="flex w-full items-center justify-between border-b-2 border-gray-200 bg-white p-2">
//                 <div className="flex items-center space-x-2">
//                     <button
//                         type="button"
//                         className="text-3xl"
//                         onClick={() => setAsideOpen(!asideOpen)}
//                     >
//                         <i className="bx bx-menu"></i>
//                     </button>
//                     <div>Logo</div>
//                 </div>
//                 {/* <div>
//                     <button
//                         type="button"
//                         onClick={() => setProfileOpen(!profileOpen)}
//                         onBlur={() => setProfileOpen(false)}
//                         className="h-9 w-9 overflow-hidden rounded-full"
//                     >
//                         <img
//                             src="https://plchldr.co/i/40x40?bg=111111"
//                             alt="plchldr.co"
//                         />
//                     </button>

//                     {profileOpen && (
//                         <div className="absolute right-2 mt-1 w-48 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white shadow-md">
//                             <div className="flex items-center space-x-2 p-2">
//                                 <img
//                                     src="https://plchldr.co/i/40x40?bg=111111"
//                                     alt="plchldr.co"
//                                     className="h-9 w-9 rounded-full"
//                                 />
//                                 <div className="font-medium">Hafiz Haziq</div>
//                             </div>

//                             <div className="flex flex-col space-y-3 p-2">
//                                 <a href="profile" className="transition hover:text-blue-600">
//                                     My Profile
//                                 </a>
//                                 <a href="editProfile" className="transition hover:text-blue-600">
//                                     Edit Profile
//                                 </a>
//                                 <a href="setting" className="transition hover:text-blue-600">
//                                     Settings
//                                 </a>
//                             </div>

//                             <div className="p-2">
//                                 <button className="flex items-center space-x-2 transition hover:text-blue-600">
//                                     <svg
//                                         className="h-4 w-4"
//                                         fill="none"
//                                         stroke="currentColor"
//                                         viewBox="0 0 24 24"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                     >
//                                         <path
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             strokeWidth="2"
//                                             d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                                         ></path>
//                                     </svg>
//                                     <div>Log Out</div>
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div> */}
//             </header>
//         </>
//     )
// }

// export default Header