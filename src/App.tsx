import {
  Client,
  Types,
  Protobuf,
  SettingsManager,
} from "@meshtastic/meshtasticjs";
import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DeviceFiles from "./DeviceFiles";
import DeviceSettings from "./DeviceSettings";
import StatusBar from "./components/StatusBar";
import Messages from "./Messages";
import PacketLog from "./PacketLog";
import Nodes from "./Nodes";
import Map from "./Map";
import Sidebar from "./sidebar";

const client = new Client();
SettingsManager.setDebugMode(Protobuf.LogLevelEnum.TRACE);
const connection = client.createHTTPConnection();
connection.connect("192.168.47.35", false, false, false, "slow", 4000);

const App = () => {
  const [messages, setMessages] = useState(
    [] as { packet: Protobuf.MeshPacket; data: string }[]
  );
  const [packets, setPackets] = useState([] as Protobuf.FromRadio[]);
  const [nodes, setNodes] = useState([] as Protobuf.NodeInfo[]);
  const [files, setFiles] = useState(
    undefined as void | Types.WebSPIFFSResponse
  );

  // const [radioConfig, setRadioConfig] = useState([]);
  // const [myInfo, setMyInfo] = useState({} as Protobuf.NodeInfo);
  const [connectionStatus, setConnectionStatus] = useState(
    Types.ConnectionEventEnum.DEVICE_DISCONNECTED
  );
  const [elapsedMeshTime, setElapsedMeshTime] = useState(new Date());
  const [httpStatus, setHttpStatus] = useState({} as Types.HTTPTransaction);

  useEffect(() => {
    const onHTTPTransactionEvent = connection.onHTTPTransactionEvent.subscribe(
      setHttpStatus
    );
    const onConnectionEvent = connection.onConnectionEvent.subscribe(
      setConnectionStatus
    );
    const onTextPacketEvent = connection.onTextPacketEvent.subscribe(
      (event) => {
        setMessages([...messages, event]);
      }
    );
    const onFromRadioEvent = connection.onFromRadioEvent.subscribe((event) => {
      setPackets([...packets, event]);
    });
    const onNodeInfoPacketEvent = connection.onNodeInfoPacketEvent.subscribe(
      (event) => {
        setNodes([...nodes, event.data]);
      }
    );
    connection.onConfigEvent.subscribe((event) => {
      updateFiles();
    });
    return () => {
      onHTTPTransactionEvent.unsubscribe();
      onConnectionEvent.unsubscribe();
      onTextPacketEvent.unsubscribe();
      onFromRadioEvent.unsubscribe();
      onNodeInfoPacketEvent.unsubscribe();
    };
  }, [nodes, packets, messages]);

  const SendMessage = (message: string) => {
    connection.sendText(message);
  };

  const updateFiles = async () => {
    setFiles(await connection.getSPIFFS());
  };

  return (
    <div className="w-screen h-screen flex">
      <BrowserRouter>
        <div className="bg-gray-800">
          <Sidebar />
        </div>

        <div className="w-full flex flex-col bg-gray-800">
          <div className="flex-grow overflow-y-auto bg-gray-200">
            <Switch>
              <Route path="/messages">
                <Messages
                  myNodeId={123}
                  messages={messages}
                  SendMessage={SendMessage}
                />
              </Route>
              <Route path="/packets">
                <PacketLog packets={packets} />
              </Route>
              <Route path="/nodes">
                <Nodes nodes={nodes} />
              </Route>

              <Route path="/settings">
                {/* <DeviceSettings
                  radioConfig={radioConfig}
                  myInfo={myInfo}
                  httpconn={connection}
                /> */}
              </Route>
              <Route path="/files">
                <DeviceFiles
                  files={files}
                  updateFiles={updateFiles}
                  connection={connection}
                />
              </Route>
              <Route path="/map">
                <Map />
              </Route>
            </Switch>
          </div>
          <StatusBar
            RadioIsConnected={connectionStatus}
            elapsedInterractionTime={httpStatus.interaction_time}
            elapsedMeshTime={elapsedMeshTime}
            totalNodes={nodes.length}
            spaceFree={files}
          />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;