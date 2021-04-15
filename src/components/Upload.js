import React, { Component, useState, } from "react";
import ReactDOM from "react-dom";
import Storage from "@aws-amplify/storage";
import {SetS3Config} from '../Funtions/services'
import Amplify, { Auth } from 'aws-amplify'; 
const Upload = ()=>{
    const [imageName, setImageName] = useState("");
    const [imageFile, setImageFile] = useState("");
    const [response, setResponse] = useState("");
    let upload = {};
    const uploading = false;
    const change = () =>{
        setImageFile(upload.files[0])
        setImageName(upload.files[0].name)
    }
    const uploadImage = () => {
        console.log(Auth)
        SetS3Config(process.env.REACT_APP_Bucket_name, "protected");
        Storage.put(`userimages/${upload.files[0].name}`,
                    upload.files[0],
                    { contentType: upload.files[0].type })
          .then(result => {
            upload = null;
            setResponse("Success uploading file!")
        })
        .catch(err => {
              setResponse(`Cannot uploading file: ${err}`)
          });
      };

    return(
<div className="App">
        <h2>S3 Upload example...</h2>
        <input
          type="file"
          accept="image/png, image/jpeg"
          style={{ display: "none" }}
          ref={ref => (upload = ref)}
          onChange={change}
        />
        <input value={imageName} placeholder="Select file" />
        <button
          onClick={e => {
            upload.value = null;
            upload.click();
          }}
          loading={uploading}
        >
          Browse
        </button>

        <button onClick={uploadImage}> Upload File </button>

        {!!response && <div>{response}</div>}
      </div>
    )
}

export default Upload