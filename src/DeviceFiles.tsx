import { IHTTPConnection, Types } from "@meshtastic/meshtasticjs";
import { FaSpinner } from "react-icons/fa";

interface DeviceFilesProps {
  connection: IHTTPConnection;
  files: void | Types.WebSPIFFSResponse;
  updateFiles: Function;
}

const DeviceFiles = (props: DeviceFilesProps) => {
  return (
    <div className="flex flex-col h-full">
      {props.files ? (
        <>
          <div className="flex-grow">
            Files:
            {props.files.data.files.map((file) => (
              <div>{file.name}</div>
            ))}
          </div>
          <div className="flex w-full h-8 bg-gray-700">
            <span>Total: {props.files.data.filesystem.total}</span>
            <span>&nbsp;Used: {props.files.data.filesystem.used}</span>/
            <span>&nbsp;Free:{props.files.data.filesystem.free}</span>
          </div>
        </>
      ) : (
        <FaSpinner className="animate-spin" />
      )}
    </div>
  );
};

export default DeviceFiles;
