import { Protobuf, Types } from "@meshtastic/meshtasticjs";
import { useEffect, useState } from "react";
import {
  FaCompactDisc,
  FaConnectdevelop,
  FaFolder,
  FaGlobeAmericas,
  FaLink,
  FaMicrochip,
  FaPlug,
  FaProjectDiagram,
  FaShieldAlt,
  FaSpinner,
  FaWifi,
} from "react-icons/fa";
import TimeAgo from "timeago-react";

interface StatusBarProps {
  RadioIsConnected: Types.DeviceStatusEnum;
  elapsedMeshTime: Date;
  elapsedInterractionTime: number;
  totalNodes: number;
  spaceFree: void | Types.WebSPIFFSResponse;
  myNode: Protobuf.MyNodeInfo;
  nodes: Protobuf.NodeInfo[];
}

const StatusBar = (props: StatusBarProps) => {
  const [myNodeInfo, setMyNodeInfo] = useState({} as Protobuf.NodeInfo);
  const [ip, setIp] = useState(localStorage.getItem("ip") || "");
  const [tls, setTls] = useState(localStorage.getItem("tls") === "true");

  useEffect(() => {
    localStorage.setItem("ip", ip);
  }, [ip]);
  useEffect(() => {
    localStorage.setItem("tls", tls ? "true" : "false");
  }, [tls]);
  useEffect(() => {
    setMyNodeInfo(
      props.nodes.filter((value) => {
        return value.num === props.myNode.myNodeNum;
      })[0]
    );
  }, [props.myNode, props.nodes]);
  return (
    <div className="flex text-gray-400">
      <div className="flex hover:bg-gray-900">
        <FaPlug
          className={`${
            props.RadioIsConnected >= Types.DeviceStatusEnum.DEVICE_CONNECTED
              ? "text-green-500"
              : props.RadioIsConnected ===
                Types.DeviceStatusEnum.DEVICE_CONNECTING
              ? "text-yellow-500"
              : "text-red-500"
          } m-2`}
        />

        {myNodeInfo ? (
          <span className="my-auto mr-2">{myNodeInfo?.user?.longName}</span>
        ) : (
          ""
        )}
      </div>
      <div
        onClick={() => {
          setTls(!tls);
        }}
        className="flex cursor-pointer hover:bg-gray-900"
      >
        <FaShieldAlt className="m-2" />
        <span className="my-auto mr-2">TLS {tls ? "Enabled" : "Disabled"}</span>
      </div>
      <div className="flex group hover:bg-gray-900">
        <FaLink className="m-2" />
        <input
          className="outline-none bg-gray-800 group-hover:bg-gray-900"
          value={ip}
          type="text"
          placeholder={ip ? ip : "Please set IP"}
          onChange={(event) => {
            setIp(event.target.value);
          }}
        />
      </div>
      {props.RadioIsConnected !== Types.DeviceStatusEnum.DEVICE_CONFIGURED ? (
        <div className="flex hover:bg-gray-900">
          <FaSpinner className="m-2 animate-spin" />
          <span className="m-auto mr-2">Loading</span>
        </div>
      ) : (
        <>
          <div className="flex hover:bg-gray-900">
            <FaConnectdevelop className="m-2" />

            <TimeAgo className="m-auto mr-2" datetime={props.elapsedMeshTime} />
          </div>
          <div className="flex hover:bg-gray-900">
            <FaWifi className="m-2" />

            <TimeAgo
              className="m-auto mr-2"
              datetime={new Date(props.elapsedInterractionTime)}
            />
          </div>
          <div className="flex hover:bg-gray-900">
            <FaProjectDiagram className="m-2" />
            <span className="m-auto mr-2">{props.totalNodes}</span>
          </div>
          <div className="flex hover:bg-gray-900">
            <FaFolder className="m-2" />
            {props.spaceFree ? (
              <span className="m-auto mr-2">
                {props.spaceFree.data.filesystem.free}
                <small>kb</small>
              </span>
            ) : (
              <p className="m-auto">Loading</p>
            )}
          </div>
          <span className="flex-grow" />
          <div className="flex hover:bg-gray-900">
            <FaGlobeAmericas className="m-2" />
            <span className="m-auto mr-2">{props.myNode.region}</span>
          </div>
          <div className="flex hover:bg-gray-900">
            <FaMicrochip className="m-2" />
            <span className="m-auto mr-2">{props.myNode.hwModel}</span>
          </div>
          <div className="flex hover:bg-gray-900">
            <FaCompactDisc className="m-2" />
            <span className="m-auto mr-2">{props.myNode.firmwareVersion}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default StatusBar;
