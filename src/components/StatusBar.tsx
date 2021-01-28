import { Types } from "@meshtastic/meshtasticjs";
import { useState } from "react";
import {
  FaConnectdevelop,
  FaFolder,
  FaPlug,
  FaProjectDiagram,
  FaSpinner,
  FaWifi,
} from "react-icons/fa";
import TimeAgo from "timeago-react";

interface StatusBarProps {
  RadioIsConnected: Types.ConnectionEventEnum;
  elapsedMeshTime: Date;
  elapsedInterractionTime: number;
  totalNodes: number;
  spaceFree: void | Types.WebSPIFFSResponse;
}

const StatusBar = (props: StatusBarProps) => {
  return (
    <div className="flex text-gray-400">
      <div className="hover:bg-gray-900">
        <FaPlug
          className={`${
            props.RadioIsConnected ===
            Types.ConnectionEventEnum.DEVICE_CONNECTED
              ? "text-green-500"
              : "text-red-500"
          } m-2`}
        />
      </div>
      {props.RadioIsConnected !== Types.ConnectionEventEnum.DEVICE_CONNECTED ? (
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
        </>
      )}
    </div>
  );
};

export default StatusBar;
