import * as React from "react";
import { Component } from "react";
import {
  FaCog,
  FaEnvelope,
  FaFileAlt,
  FaFolder,
  FaMapMarkedAlt,
  FaUsers,
} from "react-icons/fa";

class Sidebar extends Component<any, any> {
  changeView(newView: any) {
    console.log(newView);
    this.props.changeView(newView);
  }

  render() {
    return (
      <div className="flex flex-col text-gray-400">
        <div
          onClick={() => this.changeView("messages")}
          className="p-4 m-auto hover:bg-gray-700 cursor-pointer"
        >
          <FaEnvelope />
        </div>
        <div
          onClick={() => this.changeView("users_list")}
          className="p-4 m-auto hover:bg-gray-700 cursor-pointer"
        >
          <FaUsers />
        </div>
        <div
          onClick={() => this.changeView("users_map")}
          className="p-4 m-auto hover:bg-gray-700 cursor-pointer"
        >
          <FaMapMarkedAlt />
        </div>
        <div
          onClick={() => this.changeView("packet_log")}
          className="p-4 m-auto hover:bg-gray-700 cursor-pointer"
        >
          <FaFileAlt />
        </div>
        <div
          onClick={() => this.changeView("device_files")}
          className="p-4 m-auto hover:bg-gray-700 cursor-pointer"
        >
          <FaFolder />
        </div>
        <div
          onClick={() => this.changeView("device_settings")}
          className="p-4 m-auto hover:bg-gray-700 cursor-pointer"
        >
          <FaCog />
        </div>
      </div>
    );
  }
}
export default Sidebar;
