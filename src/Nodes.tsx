import { NodeInfo, User } from "@meshtastic/meshtasticjs/dist/protobuf";
import { time } from "console";
import {
  FaAddressBook,
  FaBatteryEmpty,
  FaBatteryFull,
  FaBatteryQuarter,
  FaBatteryThreeQuarters,
  FaCaretDown,
  FaClock,
  FaCog,
  FaCommentAlt,
  FaHeart,
  FaKey,
  FaMapMarkedAlt,
  FaMountain,
  FaProjectDiagram,
  FaWaveSquare,
} from "react-icons/fa";
import TimeAgo from "timeago-react";

interface NodeProps {
  nodes: NodeInfo[];
}

const Nodes = (props: NodeProps) => {
  return (
    <div>
      <div className="flex">
        <div className="flex w-1/3 bg-gray-800 text-gray-400 rounded-lg shadow-xl p-4 m-2">
          <FaHeart className="text-5xl mr-2" />
          <span className="my-auto text-2xl">
            {Math.min(
              ...props.nodes.map((value) => {
                return value.position.time;
              })
            )}
            <small>s</small>
            <b>/</b>
            {Math.max(
              ...props.nodes.map((value) => {
                return value.position.time;
              })
            )}
            <small>s</small>
          </span>
        </div>
        <div className="flex w-1/3 bg-gray-800 text-gray-400 rounded-lg shadow-xl p-4 m-2">
          <FaProjectDiagram className="text-5xl mr-2" />{" "}
          <span className="my-auto text-2xl">{props.nodes.length} Nodes</span>
        </div>
        <div className="flex w-1/3 bg-gray-800 text-gray-400 rounded-lg shadow-xl p-4 m-2">
          <FaWaveSquare className="text-5xl mr-2" />{" "}
          <span className="my-auto text-2xl">
            {props.nodes.reduce(
              (previous, current) => previous + current.snr,
              0
            ) / props.nodes.length}{" "}
            Average SNR
          </span>
        </div>
      </div>
      <div>
        {props.nodes.map((node, index) => (
          <div
            key={index}
            className="bg-gray-800 text-gray-400 rounded-lg shadow-xl p-4 m-2"
          >
            <div className="flex w-full">
              <h3 className="text-lg font-semibold leading-tight flex-1">
                {node.user ? (
                  <p>
                    {node.user.longName}
                    <small className="text-gray-500">
                      {node.user.shortName}
                    </small>
                    : {node.user.id}
                  </p>
                ) : (
                  node.num
                )}
              </h3>
              <div className="relative h-5 leading-none">
                <button className="text-xl hover:text-gray-300 h-6 focus:outline-none mr-2">
                  <FaCog />
                </button>
                <button className="text-xl hover:text-gray-300 h-6 focus:outline-none mr-2">
                  <FaCommentAlt />
                </button>
                <button className="text-xl hover:text-gray-300 h-6 focus:outline-none mr-4">
                  <FaKey />
                </button>
                <button className="text-xl hover:text-gray-300 h-6 focus:outline-none">
                  <FaCaretDown />
                </button>
              </div>
            </div>
            <div>
              <div className="p-2 my-2 bg-gray-700 rounded-lg">
                <div className="flex">
                  <FaMapMarkedAlt className="mr-2 my-auto" />
                  {node.position?.latitudeI
                    ? `${node.position.latitudeI},${node.position.longitudeI}`
                    : "Location Unknown"}
                </div>
                <div className="flex">
                  <FaClock className="mr-2 my-auto" />
                  {node.position?.time ? (
                    <TimeAgo datetime={new Date(node.position.time)} />
                  ) : (
                    "Time not sent"
                  )}
                </div>
                <div className="flex">
                  <FaMountain className="mr-2 my-auto" />
                  {node.position?.altitude
                    ? node.position.altitude
                    : "Altitude not sent"}
                </div>
              </div>
              <div className="flex -mx-4">
                <div className="w-1/3 px-4">
                  <div className="flex">
                    <span className="my-auto mr-2">
                      <FaWaveSquare />
                    </span>
                    <span className="align-middle">SNR</span>
                  </div>
                  <div className="font-medium text-lg text-white">
                    <span>{node.snr}</span>
                  </div>
                </div>
                <div className="w-1/3">
                  <div className="flex">
                    <span className="my-auto mr-2">
                      {node.position ? (
                        node.position.batteryLevel > 75 ? (
                          <FaBatteryFull />
                        ) : node.position.batteryLevel > 50 ? (
                          <FaBatteryThreeQuarters />
                        ) : node.position.batteryLevel > 25 ? (
                          <FaBatteryQuarter />
                        ) : (
                          <FaBatteryEmpty />
                        )
                      ) : (
                        <FaBatteryEmpty />
                      )}
                    </span>
                    <span className="align-middle">Battery level</span>
                  </div>
                  <div className="font-medium text-lg text-white">
                    <span>
                      {node.position
                        ? `${node.position.batteryLevel}%`
                        : "Unknown"}
                    </span>
                  </div>
                </div>
                <div className="w-1/3 px-4">
                  <div className="flex">
                    <span className="my-auto mr-2">
                      <FaAddressBook />
                    </span>
                    <span className="align-middle">MAC</span>
                  </div>
                  <div className="font-medium text-lg text-white">
                    <span>{node.user.macaddr}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nodes;
