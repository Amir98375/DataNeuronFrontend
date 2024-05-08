import React, { useState } from "react";
import "../App.css";
import { DropzoneArea, DropzoneDialog } from "material-ui-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import ProfilePic from "./ProfilePic";
import Swal from "sweetalert2";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";

const useStyles = makeStyles((theme) => ({
  dropZone: {
    border: "2px dashed #ccc",
    borderRadius: "5px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
  },
}));

const Component1 = React.memo((props) => {
  const [dragopen, setdragopen] = useState(false);
  const [url, setUrl] = useState(null);
  const [userName, setUserName] = useState(null);
  const [designation, setDesignation] = useState(null);
  const [myArr, setMyArray] = useState([]);
  const classes = useStyles();
  const handleClose = () => {
    setdragopen(false);
  };

  const handleSave = (files) => {
    debugger;
    let v_UploadDocuments_files = { ...files };
    console.log(files, "file");
    if (files[0].size > 10000000) {
      Swal.fire({
        title: "Size",
        text: "File Size cannot be more than 100 Kb",
        icon: "error",
      });
      //   popUp({ message: "" });
      return;
    }
    if (files.length > 1) {
      Swal.fire({
        title: "One select",
        text: "Cannot select more than 1 pic",
        icon: "error",
      });
      //   popUp({ message: "Cannot upload more than one file" });
      return;
    }

    let name = files[0].name;
    let type = files[0].type;

    let fileBase64 = "";
    getBase64(v_UploadDocuments_files[0], (result) => {
      debugger;

      let deleteSring = result.replace("data:application/pdf;base64,", "");
      fileBase64 = deleteSring;
      let imgFile = fileBase64.substr(22);

      console.log("image found", result);
      setUrl(result);
      setdragopen(false);

      //   setdragopen(false)
    });
  };
  const getBase64 = (file, cb) => {
    debugger;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };
  const handleOpen = () => {
    setdragopen(true);
  };

  const onSubmit = () => {
    debugger
    if (designation && userName && url) {
      let obj = {
          userName: userName,
          designation: designation,
          imageUrl: url,
      };
      let headers = {
          'Content-Type': 'application/json', // Adjust content type if needed
          // Add any other headers you need
      };
      let Api = 'http://localhost:5000/addDetails';
  
      // Send the request
      trackPromise(axios.post(Api, obj, { headers: headers })).then((resp) => {
          console.log(resp, "response");
  
          // Show success message using SweetAlert2
          Swal.fire({
              title: "Done",
              text: "Data uploaded successfully",
              icon: "success",
          }).then((el)=>{
            if(el.isConfirmed){
              props.apiCall()
            }
          })
      }).catch((error) => {
          console.error(error);
  
          // Show error message using SweetAlert2
          Swal.fire({
              title: "Error",
              text: "Failed to upload data",
              icon: "error",
          });
      });
  } else {
      // Show validation error message using SweetAlert2
      Swal.fire({
          title: "Error",
          text: "Please enter all fields",
          icon: "error",
      }).then((el)=>{
        if(el.isConfirmed){
     
        }
      })
  }
  
  };
  return (
    <div className="component1">
      <ProfilePic imageUrl={url} />
      <input
        type="text"
        placeholder="Enter Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Designation"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
      />
      <DropzoneDialog
        open={dragopen}
        showFileNames={true}
        onSave={handleSave}
        acceptedFiles={["image/jpeg", "image/png", ".pdf"]}
        // acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose}
        style={{ zIndex: 6 }} 
      />

      <button style={{ margin: "10px" }} onClick={()=>handleOpen()}>
        Browse
      </button>
      <button style={{ margin: "10px" }} onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
});

export default Component1;
