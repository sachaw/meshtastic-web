import * as React from "react";
import { Component } from "react";

class HTTPStatus extends Component<any, any> {
  interval: any;

  state = {
    seconds_since_http_interaction: 0,
    seconds_since_radio_packet: 0,
  };

  GetTimeColor(seconds: number) {
    if (seconds < 10) {
      return "green";
    } else if (seconds < 30) {
      return "orange";
    } else {
      return "red";
    }
  }

  GetHTTPColor() {
    return this.props.HTTPStatus !== 200 ? "green" : "red";
  }

  GetFormattedSecondsString(seconds: number) {
    if (seconds < 60) {
      return seconds + "s";
    } else if (seconds < 60 * 60) {
      const minutes = Math.floor(seconds / 60);
      const seconds_rem = Math.round(seconds - minutes * 60);
      return minutes + "m " + seconds_rem + "s";
    } else {
      const hours = Math.floor(seconds / 60 / 60);
      const minutes = Math.round((seconds - hours * 60 * 60) / 60);
      const seconds_rem = Math.round(seconds - hours * 60 * 60 - minutes * 60);
      return hours + "h " + minutes + "m " + seconds_rem + "s";
    }
  }

  componentDidMount() {
    // borrowed from: https://stackoverflow.com/questions/39426083/update-react-component-every-second
    this.interval = setInterval(() => {
      const now: any = new Date();
      this.setState({
        seconds_since_http_interaction: Math.trunc(
          (now - this.props.HTTPStatus.interaction_time) / 1000
        ),
        seconds_since_radio_packet: Math.trunc(
          (now - this.props.RadioStatus.interaction_time) / 1000
        ),
      });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // do this: https://stackoverflow.com/questions/39426083/update-react-component-every-second

  render() {
    return (
      <div>
        Connected: {this.props.RadioIsConnected ? "true" : "false"}
        &nbsp; || &nbsp; HTTP Status: (
        <span
          style={{
            color: this.GetHTTPColor(),
          }}
        >
          {this.props.HTTPStatus.status}
        </span>
        /
        <span
          style={{
            color: this.GetTimeColor(this.state.seconds_since_http_interaction),
          }}
        >
          {this.GetFormattedSecondsString(
            this.state.seconds_since_http_interaction
          )}
        </span>
        ) &nbsp; || &nbsp; Radio Mesh: (
        <span
          style={{
            color: this.GetTimeColor(this.state.seconds_since_radio_packet),
          }}
        >
          {this.GetFormattedSecondsString(
            this.state.seconds_since_radio_packet
          )}
        </span>
        )
      </div>
    );
  }
}

export default HTTPStatus;
