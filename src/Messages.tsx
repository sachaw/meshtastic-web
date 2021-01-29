import { useEffect, useState } from "react";
import { FaCheck, FaPaperPlane, FaSpinner } from "react-icons/fa";
import { Protobuf } from "@meshtastic/meshtasticjs";

interface MessagesProps {
  messages: { packet: Protobuf.MeshPacket; data: string }[];
  myNodeId: number;
  SendMessage: Function;
}

const Messages = (props: MessagesProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [tempMessages, setTempMessages] = useState([] as string[]);

  useEffect(() => {
    props.messages.map((value) => {
      setTempMessages(
        tempMessages.filter(
          (string) =>
            string !== value.data && value.packet.from === props.myNodeId
        )
      );
    });
  }, [props.messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        {props.messages.map((value, index) => (
          <div
            key={index}
            className={`${
              value.packet.from === props.myNodeId
                ? "float-right bg-gray-800"
                : "float-left bg-gray-700"
            } flex justify-between text-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg`}
          >
            {value.data}
            <FaCheck className="my-auto text-gray-500" />
          </div>
        ))}
        {tempMessages.map((value, index) => (
          <div
            key={index}
            className="float-right bg-gray-800 flex justify-between text-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg animate-pulse"
          >
            {value}
            <FaSpinner className="my-auto text-gray-500 animate-spin" />
          </div>
        ))}
      </div>

      <form
        className="relative m-2"
        onSubmit={(event) => {
          event.preventDefault();
          if (newMessage.length > 0) {
            props.SendMessage(newMessage);
            setTempMessages([newMessage, ...tempMessages]);
            setNewMessage("");
          }
        }}
      >
        <input
          onChange={(event) => {
            setNewMessage(event.target.value);
          }}
          value={newMessage}
          type="text"
          className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
        />
        <button
          type="submit"
          className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default Messages;
