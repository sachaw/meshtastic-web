import { Link } from "react-router-dom";
import {
  FaCog,
  FaEnvelope,
  FaFileAlt,
  FaFolder,
  FaMapMarkedAlt,
  FaProjectDiagram,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="flex flex-col text-gray-400">
      <Link
        className="p-4 m-auto hover:bg-gray-700 cursor-pointer"
        to="messages"
      >
        <FaEnvelope />
      </Link>

      <Link className="p-4 m-auto hover:bg-gray-700 cursor-pointer" to="nodes">
        <FaProjectDiagram />
      </Link>
      <Link className="p-4 m-auto hover:bg-gray-700 cursor-pointer" to="map">
        <FaMapMarkedAlt />
      </Link>
      <Link
        className="p-4 m-auto hover:bg-gray-700 cursor-pointer"
        to="packets"
      >
        <FaFileAlt />
      </Link>
      <Link className="p-4 m-auto hover:bg-gray-700 cursor-pointer" to="files">
        <FaFolder />
      </Link>
      <Link
        className="p-4 m-auto hover:bg-gray-700 cursor-pointer"
        to="settings"
      >
        <FaCog />
      </Link>
    </div>
  );
};
export default Sidebar;
