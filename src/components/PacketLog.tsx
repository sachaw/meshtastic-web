import * as React from "react";
import { Component } from "react";

class PacketLog extends Component<any, any> {
  // TODO: This shouldn't be necessary
  // but for some reason, packets from meshtastic.js throw
  // an exception when stringifying them
  PacketToString(value: any) {
    try {
      return JSON.stringify(value);
    } catch (error) {
      return "Couldn't render packet";
    }
  }
  render() {
    console.log(this.props.packets);
    return (
      <div>
        Packets:
        {this.props.packets.map((value: any, index: any) => (
          <div
            key={index}
            style={{
              marginTop: 10,
              border: "1px solid black",
            }}
          >
            {this.PacketToString(value)}
            <br />
          </div>
        ))}
      </div>
    );
  }
}

export default PacketLog;
