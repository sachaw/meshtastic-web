import * as React from "react";
import {
  FaCog,
  FaEnvelope,
  FaFileAlt,
  FaFolder,
  FaMapMarkedAlt,
  FaUsers,
} from "react-icons/fa";

interface SidebarProps {
  changeView: Function;
  currentUser: any;
  currentView: string;
}

const Sidebar = (props: SidebarProps) => {
  const changeView = (newView: any) => {
    props.changeView(newView);
  };

  return (
    <div className="flex flex-col text-gray-400">
      <div
        onClick={() => changeView("messages")}
        className={`p-4 m-auto hover:bg-gray-700 cursor-pointer ${
          props.currentView === "messages" ? "bg-gray-700" : ""
        }`}
      >
        <FaEnvelope />
      </div>
      <div
        onClick={() => changeView("users_list")}
        className={`p-4 m-auto hover:bg-gray-700 cursor-pointer ${
          props.currentView === "users_list" ? "bg-gray-700" : ""
        }`}
      >
        <FaUsers />
      </div>
      <div
        onClick={() => changeView("users_map")}
        className={`p-4 m-auto hover:bg-gray-700 cursor-pointer ${
          props.currentView === "users_map" ? "bg-gray-700" : ""
        }`}
      >
        <FaMapMarkedAlt />
      </div>
      <div
        onClick={() => changeView("packet_log")}
        className={`p-4 m-auto hover:bg-gray-700 cursor-pointer ${
          props.currentView === "packet_log" ? "bg-gray-700" : ""
        }`}
      >
        <FaFileAlt />
      </div>
      <div
        onClick={() => changeView("device_files")}
        className={`p-4 m-auto hover:bg-gray-700 cursor-pointer ${
          props.currentView === "device_files" ? "bg-gray-700" : ""
        }`}
      >
        <FaFolder />
      </div>
      <div
        onClick={() => changeView("device_settings")}
        className={`p-4 m-auto hover:bg-gray-700 cursor-pointer ${
          props.currentView === "device_settings" ? "bg-gray-700" : ""
        }`}
      >
        <FaCog />
      </div>
    </div>
  );
};
export default Sidebar;
