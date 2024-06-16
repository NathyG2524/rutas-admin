"use client"
import React from "react";
import {
  IconBellQuestion,
  IconHome2,
  IconPlane,
  IconUpload,
} from "@tabler/icons-react";

interface NavItem {
  id: string;
  label: string;
  icons: JSX.Element;
}

interface Props {
  activeNavItem: string;
  onNavItemClick: (id: string) => void;
}

const Aside: React.FC<Props> = ({ activeNavItem, onNavItemClick }) => {
  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icons: <IconHome2 /> },
    { id: "trips", label: "Trips", icons: <IconPlane /> },
    { id: "request", label: "Request", icons: <IconBellQuestion /> },
    { id: "uploadTrips", label: "Upload Trips", icons: <IconUpload /> },
  ];

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <a href="#" title="home">
            <img
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              className="w-32"
              alt="tailus logo"
            />
          </a>
        </div>

        <div className="mt-8 text-center">
          <img
            src="https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            Rutas de Serendipia
          </h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {navItems.map((item) => (
            <li
              key={item.id}
              className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
            >
              <button
                onClick={() => onNavItemClick(item.id)}
                className={`flex items-center space-x-1 rounded-md gap-2 w-full px-4 py-3 ${
                  activeNavItem === item.id
                    ? "bg-gray-100 text-blue-600"
                    : "hover:bg-gray-100 hover:text-blue-600"
                }`}
              >
                <span className="text-2xl">{item.icons}</span>
                <span className="group-hover:text-gray-700">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
