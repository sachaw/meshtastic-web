import { Protobuf } from "@meshtastic/meshtasticjs";
import { PortNumEnum } from "@meshtastic/meshtasticjs/dist/protobuf";

interface PacketLogProps {
  packets: Protobuf.FromRadio[];
}

const PacketLog = (props: PacketLogProps) => {
  const renderMeshPacet = (value: Protobuf.FromRadio) => {
    switch (value.packet.decoded.data.portnum) {
      case PortNumEnum.TEXT_MESSAGE_APP:
        return (
          <div className="flex">
            <div className="flex h-full rounded-l p-2 bg-purple-300 w-1/5">
              <p className="m-auto font-bold">MeshPacket: Text</p>
            </div>

            <p className="mx-2 my-auto">Message:</p>
          </div>
        );

      case PortNumEnum.POSITION_APP:
        return (
          <div className="flex">
            <div className="flex h-full rounded-l p-2 bg-purple-300 w-1/5">
              <p className="m-auto font-bold">MeshPacket: Position</p>
            </div>
            {/* 
            {value.data.latitudeI ? (
              <p className="mx-2 my-auto">Latitude: {value.data.latitudeI}</p>
            ) : (
              ""
            )}
            {value.data.longitudeI ? (
              <p className="mx-2 my-auto">Longitude: {value.data.longitudeI}</p>
            ) : (
              ""
            )}
            {value.data.altitude ? (
              <p className="mx-2 my-auto">Altitude: {value.data.altitude}</p>
            ) : (
              ""
            )}
            {value.data.batteryLevel ? (
              <p className="mx-2 my-auto">
                Battery Level: {value.data.batteryLevel}
              </p>
            ) : (
              ""
            )}
            {value.data.time ? (
              <p className="mx-2 my-auto">Time: {value.data.time}</p>
            ) : (
              ""
            )} */}
          </div>
        );

      default:
        return <p className="mx-2 my-auto">Not found: {value.num}</p>;
    }
  };

  const renderpacket = (value: Protobuf.FromRadio) => {
    switch (value.constructor.name) {
      case "IHTTPConnection":
        return (
          <div className="flex">
            <div className="flex h-full rounded-l p-2 bg-green-300 w-1/5">
              <p className="m-auto font-bold">IHTTPConnection</p>
            </div>

            <p className="mx-2 my-auto">Library Instantiated</p>
          </div>
        );

      case "FromRadio":
        return (
          <div className="flex">
            <div className="flex h-full rounded-l p-2 bg-blue-300 w-1/5">
              <p className="m-auto font-bold">FromRadio</p>
            </div>

            <p className="mx-2 my-auto">Packet: </p>
          </div>
        );

      case "MeshPacket":
        return renderMeshPacet(value);

      default:
        return (
          <p className="mx-2 my-auto">Not found: {value.constructor.name}</p>
        );
    }
  };

  return (
    <div className="m-2">
      {props.packets.map((value, index) => (
        <div key={index} className="w-full bg-gray-400 m-2 rounded">
          {renderpacket(value)}
        </div>
      ))}
    </div>
  );
};

export default PacketLog;
