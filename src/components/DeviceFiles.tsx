import * as React from "react";
import { Component, createRef } from "react";
import DeviceFile from "./DeviceFile";

const DeviceFiles = (props: any) => {
  const refreshSPIFFSFileTree = () => {
    console.log("getting filetree");
    fetch("/json/spiffs/browse/static/").then(
      // function (response: any) {
      //   if (response.status !== 200) {
      //     // couldn't read files
      //     return;
      //   }
      //   response.json().then(
      //     function (data: any) {
      //       console.log(data.data);
      //       this.setState({
      //         files: data.data.files,
      //         filesystem: data.data.filesystem,
      //       });
      //     }.bind(this)
      //   );
      // }.bind(this)
      (response) => {
        console.log(response);
      }
    );
  };

  const fileUpload = (file: File) => {
    // this.setState({ isUploading: true });
    const formData = new FormData();
    formData.append("file", file);
    return fetch("/upload", {
      method: "POST",
      body: formData,
    }).then((response) => {
      console.log("File upload successful");
      // this.setState({
      //   file: null,
      //   isUploading: false,
      // });
      refreshSPIFFSFileTree();
    });
  };

  const filesystemUtilizationBar = () => {
    // const kbUsed = Math.round(this.state.filesystem.used / 1000);
    // const kbFree = Math.round(this.state.filesystem.free / 1000);
    // const kbTotal = Math.round(this.state.filesystem.total / 1000);
    // const pctUsed = Math.round(
    //   (this.state.filesystem.used / this.state.filesystem.total) * 100
    // );
    // const pctFree = Math.round(
    //   (this.state.filesystem.free / this.state.filesystem.total) * 100
    // );
    return (
      <div className="">
        {/* <div
          className=""
          style={{
            width: pctUsed + "%",
          }}
        >
          {kbUsed}kb Used ({pctUsed}%)
        </div>
        <div
          className=""
          style={{
            width: pctFree + "%",
          }}
        >
          {kbFree}kb Free ({pctFree}%)
        </div>
        <div className="">Total Size: {kbTotal}kb</div> */}
      </div>
    );
  };

  const deleteFile = (filename: string) => {
    fetch("/json/spiffs/delete/static?delete=" + filename, {
      method: "DELETE",
    }).then(() => {
      refreshSPIFFSFileTree();
    });
  };

  // return {
  // if (this.state.isUploading) {
  //   return (
  //     <div className="">
  //       <div className="">Upload in progress</div>
  //     </div>
  //   );
  // } else if (this.state.drag) {
  //   return (
  //     <div className="">
  //       <div className="">Drop files to upload</div>
  //     </div>
  //   );
  // } else {
  return (
    <div className="flex">
      <div className="w-1/2">
        {/* <div className="">
              {this.state.files.map((value: any, index: any) => (
                <DeviceFile
                  name={value.name}
                  size={value.size}
                  delete={this.deleteFile}
                />
              ))}
            </div> */}

        {filesystemUtilizationBar()}
      </div>
      {/* <div
            className="w-1/2 h-full rounded-lg border-2 border-black border-dashed"
            ref={this.dropRef}
          >
            <form onSubmit={this.onFormSubmit}>
              <input type="file" onChange={this.onChange} />
              <button type="submit">Upload File</button>
              <p>Drop files here to upload</p>
            </form>
          </div> */}
    </div>
  );
};
//   }
// }

export default DeviceFiles;
