import {
  Client,
  Types,
  Protobuf,
  SettingsManager,
} from "@meshtastic/meshtasticjs";
import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DeviceFiles from "./DeviceFiles";
import StatusBar from "./components/StatusBar";
import Messages from "./Messages";
import PacketLog from "./PacketLog";
import Nodes from "./Nodes";
import Map from "./Map";
import Sidebar from "./sidebar";

const client = new Client();
SettingsManager.setDebugMode(Protobuf.LogLevelEnum.WARNING);
const connection = client.createHTTPConnection();
connection.connect(
  localStorage.getItem("ip") || "",
  localStorage.getItem("tls") === "true",
  false,
  false,
  4000
);

const App = () => {
  const [messages, setMessages] = useState(
    [] as { packet: Protobuf.MeshPacket; data: string }[]
  );
  const [packets, setPackets] = useState([] as Protobuf.FromRadio[]);
  const [nodes, setNodes] = useState([] as Protobuf.NodeInfo[]);
  const [files, setFiles] = useState(
    undefined as void | Types.WebSPIFFSResponse
  );
  const [myNode, setMyNode] = useState({} as Protobuf.MyNodeInfo);

  const [connectionStatus, setConnectionStatus] = useState(
    Types.DeviceStatusEnum.DEVICE_DISCONNECTED
  );
  // const [elapsedMeshTime, setElapsedMeshTime] = useState(new Date());
  const [httpStatus, setHttpStatus] = useState({} as Types.DeviceTransaction);

  useEffect(() => {
    const onHTTPTransactionEvent = connection.onDeviceTransactionEvent.subscribe(
      setHttpStatus
    );
    const onConnectionEvent = connection.onDeviceStatusEvent.subscribe(
      (event) => {
        setConnectionStatus(event);
        if (event === Types.DeviceStatusEnum.DEVICE_CONFIGURED) {
          updateFiles();
        }
      }
    );
    const onTextPacketEvent = connection.onTextPacketEvent.subscribe(
      (event) => {
        setMessages([...messages, event]);
      }
    );
    const onFromRadioEvent = connection.onFromRadioEvent.subscribe((event) => {
      setPackets([...packets, event]);
      console.log(event);
    });
    const onNodeInfoPacketEvent = connection.onNodeInfoPacketEvent.subscribe(
      (event) => {
        setNodes([...nodes, event.data]);
      }
    );
    connection.onMyNodeInfoEvent.subscribe((event) => {
      setMyNode(event);
    });
    connection.onRadioConfigEvent.subscribe((event) => {});
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
                  myNodeId={myNode.myNodeNum}
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

              <Route path="/settings"></Route>
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
            elapsedMeshTime={new Date()}
            totalNodes={nodes.length}
            spaceFree={files}
            myNode={myNode}
            nodes={nodes}
          />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
