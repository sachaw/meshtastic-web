import * as React from "react";
import { Component } from "react";
import Sidebar from "./sidebar";
import Messages from "./components/messages";
import {
  Client,
  IHTTPConnection,
  SettingsManager,
} from "@meshtastic/meshtasticjs";
import PacketLog from "./components/PacketLog";
import HTTPStatus from "./components/httpstatus";
import Users from "./components/users";
import Favicon from "react-favicon";
import DeviceSettings from "./components/DeviceSettings";
import DeviceFiles from "./components/DeviceFiles";

class App extends Component<any, any> {
  httpconn = new IHTTPConnection();

  constructor(props: any) {
    super(props);
    this.addToMessageArray = this.addToMessageArray.bind(this);
    this.addToPacketArray = this.addToPacketArray.bind(this);
    this.changeView = this.changeView.bind(this);
    this.SendMessage = this.SendMessage.bind(this);
    this.SetHTTPStatus = this.SetHTTPStatus.bind(this);
    this.SetRadioStatus = this.SetRadioStatus.bind(this);
    this.SetConnectionStatus = this.SetConnectionStatus.bind(this);
    this.UpdateUserList = this.UpdateUserList.bind(this);

    const now = new Date();
    this.state = {
      messages: [],
      meshRadios: [],
      packets: [],
      currentView: "messages",
      httpConnectionStatus: {
        interaction_time: now,
      },
      radioPacketStatus: {
        interaction_time: now.getTime(),
      },
      radioIsConnected: false,
      users: [],
      radioConfig: {},
      myInfo: {},
      user: {},
    };
  }

  componentDidMount() {
    this.setupHTTP();
  }

  addToMessageArray(newmessage: any) {
    this.setState({
      messages: [...this.state.messages, newmessage],
    });
  }

  addToPacketArray(newPacket: any) {
    this.setState({
      packets: [...this.state.packets, newPacket],
    });
  }

  changeView(newView: any) {
    this.setState({
      currentView: newView,
    });
  }

  SendMessage(message: any, callback: any) {
    if (this.httpconn.isConnected) {
      this.httpconn.sendText(message);
    }
    callback();
  }

  SetHTTPStatus(status: any) {
    this.setState({
      httpConnectionStatus: status,
    });
  }

  SetRadioStatus(status: any) {
    this.setState({
      radioPacketStatus: status,
    });
  }

  SetConnectionStatus(status: any) {
    this.setState({
      radioIsConnected: status,
    });
  }
  UpdateUserList(UserPacket: any) {
    const newUserDTO = {
      id: UserPacket.decoded.user.id,
      longName: UserPacket.decoded.user.longName,
      shortName: UserPacket.decoded.user.shortName,
      lastSeen: UserPacket.rxtime,
    };

    this.setState({
      users: [...this.state.users, newUserDTO],
    });
  }

  setupHTTP() {
    const client = new Client();
    SettingsManager.setDebugMode(0);
    this.httpconn = client.createHTTPConnection();

    // Set connection params
    let sslActive;
    if (window.location.protocol === "https:") {
      sslActive = true;
    } else {
      sslActive = false;
    }

    let deviceIp = "192.168.60.49";
    // let deviceIp = window.location.hostname + ":" + window.location.port; // Your devices IP here
    this.httpconn.onConnectedEvent.subscribe((event) => {
      this.SetConnectionStatus(true);
      console.log("connected To Radio");
    });

    this.httpconn.onDisconnectedEvent.subscribe((event) => {
      console.log("disconnected from Radio");
      this.SetConnectionStatus(false);
    });

    this.httpconn.onHTTPTransactionEvent.subscribe((event) => {
      this.SetHTTPStatus(event);
    });

    // let data = this.httpconn.onFromRadioEvent.subscribe( fromRadio => {
    //   fromRadio
    // })
    this.httpconn.onFromRadioEvent.subscribe((event) => {
      console.log("Radio: " + JSON.stringify(event));
      this.addToPacketArray(event);
      const now = new Date();
      this.SetRadioStatus({
        interaction_time: now.getTime(),
      });
    });

    this.httpconn.onDataPacketEvent.subscribe((event) => {
      console.log("Data: " + JSON.stringify(event));
      this.addToMessageArray(event);
    });

    this.httpconn.onUserPacketEvent.subscribe((event) => {
      console.log("User: " + JSON.stringify(event));
      this.addToPacketArray(event);
      this.UpdateUserList(event);
    });

    this.httpconn.onPositionPacketEvent.subscribe((event) => {
      console.log("Position: " + JSON.stringify(event));
      this.addToPacketArray(event);
    });

    this.httpconn.onNodeListChangedEvent.subscribe((event) => {
      console.log("NodeList: " + JSON.stringify(event));
      this.addToPacketArray(event);
    });

    this.httpconn.onConfigDoneEvent.subscribe((event) => {
      this.addToPacketArray(event);
      this.setState({
        radioConfig: event.radioConfig,
        myInfo: event.myInfo,
        user: event.user,
      });
    });

    this.httpconn
      .connect(deviceIp, sslActive, false, false, "balanced", 5000)
      // .then((result) => {
      //   if (false) {
      //     console.log("Setting configs");
      //     this.httpconn.setRadioConfig(
      //       new RadioConfig({

      //       preferences: {
      //         sendOwnerInterval: 10,
      //         positionBroadcastSecs: 10,
      //         waitBluetoothSecs: 86400,
      //         screenOnSecs: 10,
      //         minWakeSecs: 1000000,
      //       },
      //     }));
      //     this.httpconn.setOwner({
      //       id: "1",
      //       longName: "charles",
      //       shortName: "cc",
      //     });
      //   }
      // })
      .catch((error) => {
        this.httpconn.isConnected = false;
        console.log("Error connecting: ");
        console.log(error);
      });
  }

  AppBody() {
    if (this.state.currentView === "messages") {
      return (
        <Messages
          messages={this.state.messages}
          SendMessage={this.SendMessage}
        />
      );
    } else if (this.state.currentView === "packet_log") {
      return <PacketLog packets={this.state.packets} />;
    } else if (this.state.currentView === "users_list") {
      return <Users users={this.state.users} />;
    } else if (this.state.currentView === "device_settings") {
      return (
        <DeviceSettings
          radioConfig={this.state.radioConfig}
          myInfo={this.state.myInfo}
          httpconn={this.httpconn}
        />
      );
    } else if (this.state.currentView === "device_files") {
      return <DeviceFiles />;
    }
  }

  GetFavicon() {
    if (this.state.radioIsConnected) {
      return "/static/fav-con.svg";
    } else {
      return "/static/fav-dis.svg";
    }
  }

  render() {
    if (this.state.user) {
      return (
        <div className="w-screen h-screen flex">
          <Favicon
            url={this.GetFavicon()}
            alertCount={this.state.messages.length}
          />
          <div className="bg-gray-800">
            <Sidebar
              changeView={this.changeView}
              currentUser={this.state.user}
            />
          </div>

          <div className="w-full flex flex-col bg-gray-700">
            <div className="h-8 w-full flex">
              <h2 className="m-auto">Meshtastic</h2>
            </div>
            <div className="flex-grow overflow-y-auto bg-gray-200">
              {this.AppBody()}
            </div>
            <div className="bg-black text-white">
              <HTTPStatus
                RadioIsConnected={this.state.radioIsConnected}
                HTTPStatus={this.state.httpConnectionStatus}
                RadioStatus={this.state.radioPacketStatus}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return <div className="">Loading...</div>;
    }
  }
}

export default App;
