import * as React from "react";
import { Component } from "react";
import Message from "./message";
import { FaPaperPlane } from "react-icons/fa";

class Messages extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.SendMessage = this.SendMessage.bind(this);
    this.NewMessageChange = this.NewMessageChange.bind(this);
    this.state = {
      NewMessageValue: "",
    };
  }

  SendMessage(e: any) {
    e.preventDefault();
    this.props.SendMessage(this.state.NewMessageValue, () => {
      this.setState({
        NewMessageValue: "",
      });
    });
  }

  NewMessageChange(event: any) {
    this.setState({
      NewMessageValue: event.target.value,
    });
  }

  render() {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          {this.props.messages.map((value: any, index: any) => (
            <Message message={value} />
          ))}
        </div>

        <form className="relative m-2" onSubmit={this.SendMessage}>
          <input
            onChange={this.NewMessageChange}
            value={this.state.NewMessageValue}
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
  }
}

export default Messages;
