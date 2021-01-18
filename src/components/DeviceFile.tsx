import * as React from "react";

interface DeviceFileProps {
  name: string;
  size: number;
  delete(FileToDelete: string): void;
}

const DeviceFile = (props: DeviceFileProps) => {
  return (
    <div className="">
      <div>
        <a href={props.name}>{props.name}</a>
      </div>
      <div>{props.size}</div>
      <div>
        <button
          onClick={(event) => {
            event.preventDefault();
            props.delete(props.name);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeviceFile;
