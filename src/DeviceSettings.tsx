import { Component } from "react";

class DeviceSettings extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.handlePreferenceChange = this.handlePreferenceChange.bind(this);
    this.writeToRadio = this.writeToRadio.bind(this);
    this.state = {
      radioConfig: {},
      myInfo: {},
      isDirty: false,
    };
  }

  static getDerivedStateFromProps(props: any, state: any) {
    // This will erase any local state updates!
    // Do not do this.
    return {
      radioConfig: props.radioConfig,
      myInfo: props.myInfo,
    };
  }

  handlePreferenceChange(event: any) {
    const newPreferences = this.state.radioConfig.preferences;
    newPreferences[event.target.name] = event.target.value;

    const newRadioConfig = this.state.radioConfig;
    newRadioConfig.preferences = newPreferences;
    this.setState({
      radioConfig: newRadioConfig,
      isDirty: true,
    });
  }

  writeToRadio() {
    console.log("setting radio configs: ", this.state.radioConfig);
    this.props.httpconn.setRadioConfig(this.state.radioConfig);
    console.log("done setting radio config; rebooting");
    fetch("/restart", {
      method: "POST",
    });
  }

  unsavedChanges() {
    if (this.state.isDirty) {
      return (
        <div>
          <span>Notice: There are unsaved configuration changes</span>
          <br />
          <button onClick={this.writeToRadio} disabled={!this.state.isDirty}>
            {" "}
            Save and Reboot
          </button>
        </div>
      );
    }
  }

  render() {
    const proto = Object.getPrototypeOf(this.state.radioConfig.preferences);
    const availableUserPreferences = Object.getOwnPropertyNames(proto)
      .filter(
        (name) =>
          typeof this.state.radioConfig.preferences[name] !== "function" &&
          name !== "$type"
      )
      .sort();

    const prefs = availableUserPreferences.map((key, index) => (
      <div key={index}>
        <span className="text-xl">{key} </span>
        <input
          className=""
          name={key}
          onChange={this.handlePreferenceChange}
          value={this.state.radioConfig.preferences[key]}
        />
        <br />
      </div>
    ));

    const myInfo = Object.keys(this.state.myInfo).map((key, index) => (
      <div key={index}>
        <span className="">{key} </span>
        <span className="">{this.state.myInfo[key]}</span>
        <br />
      </div>
    ));

    const channelSettings = Object.keys(
      this.state.radioConfig.channelSettings
    ).map((key) => (
      <div>
        <span className="">{key} </span>
        <span className="">{this.state.radioConfig.channelSettings[key]}</span>
        <br />
      </div>
    ));

    return (
      <div className="flex">
        <div className="flex flex-col w-1/2">
          <div className="">
            <span className="text-2xl">Device Profile</span>
            <br />
            {myInfo}
          </div>
          <div className="">
            <span className="text-2xl">Device Actions</span>
            <br />
            <button
              onClick={() => {
                fetch("/restart", {
                  method: "POST",
                });
              }}
            >
              Restart
            </button>
            <button
              onClick={() => {
                var formData = new FormData();
                formData.append("blink_target", "LED");
                fetch("/json/blink?blink_target=LED", {
                  method: "POST",
                });
              }}
            >
              Blink LED
            </button>
            <button
              onClick={() => {
                var formData = new FormData();
                formData.append("blink_target", "SCREEN");
                fetch("/json/blink?blink_target=SCREEN", {
                  method: "POST",
                });
              }}
            >
              Blink Screen
            </button>
            {this.unsavedChanges()}
          </div>
          <div className="">
            <span className="">Channel Settings</span>
            <br />
            {channelSettings}
          </div>
        </div>
        <div className="flex flex-col w-1/2">
          <div className="">{prefs}</div>
        </div>
      </div>
    );
  }
}

export default DeviceSettings;
