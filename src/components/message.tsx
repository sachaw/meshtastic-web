import * as React from "react";
import { Component } from "react";
import { Protobuf } from "@meshtastic/meshtasticjs";

const Message = (props: any) => {
  const sentByUs = () => {
    return props.message.from === "476493745";
  };

  const messageBody = () => {
    if (
      props.message.decoded.data.portnum ===
      Protobuf.PortNumEnum.TEXT_MESSAGE_APP
    ) {
      return props.message.decoded.data.payload;
    } else {
      return "Binary data";
    }
  };

  let rxTime = new Date(props.message.rxTime);
  return (
    <div
      className="flex w-full h-12"
      style={{
        backgroundColor: sentByUs() ? "red" : "blue",
        color: sentByUs() ? "black" : "white",
        float: sentByUs() ? "left" : "right",
      }}
    >
      <div className="MessageHead">
        From: {props.message.from} || To: {props.message.to}
      </div>
      <div
        className="MessageBody"
        style={{
          textAlign: sentByUs() ? "left" : "right",
        }}
      >
        {messageBody()}
      </div>
      <div className="MessageFooter">
        RxSnr: {props.message.rxSnr} || RxTime:{" "}
        {rxTime.toLocaleString("en-US", { timeZone: "EST" })} || hopLimit:{" "}
        {props.message.hopLimit}
      </div>
    </div>
  );
};

export default Message;
