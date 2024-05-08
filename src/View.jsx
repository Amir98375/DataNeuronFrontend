import React, { useEffect, useState } from "react";
import "./component.css";
import Component1 from "./component/component1";
import Component2 from "./component/component2";
import Component3 from "./component/component3";
import axios from "axios";
import Swal from "sweetalert2";
import { trackPromise } from "react-promise-tracker";



export const MYAPP = () => {
  const [data,setData]=useState([])
  const [showdata,setRowData]=useState({})

  useEffect(()=>{
    apiCallGet()
  },[])
  const apiCallGet=()=>{
    console.log('apicalll function called in view')
debugger

      let headers = {
          'Content-Type': 'application/json', // Adjust content type if needed
          // Add any other headers you need
      };
      let Api = 'http://localhost:5000/addDetails';
  

      trackPromise(axios.get(Api)).then((resp) => {
          console.log(resp, "response in view");
          setData(resp.data)
  
   

      }).catch((error) => {
          console.error(error);
  
          Swal.fire({
              title: "Error",
              text: "Failed to load data",
              icon: "error",
          });
      });

  
  }

  const getRowData=(event,rowData)=>{
  console.log(event,rowData)
  setRowData(rowData)
  }
  return (
    <>
      <div class="container">
        <div class="component" id="component1">
          <Component1 apiCall={apiCallGet}/>
        </div>
        <div class="component" id="component2">
          <Component2 tableData={data}  getRowData={getRowData} apiCall={apiCallGet}/>
        </div>
      </div>
      <div class="component3" id="component3"
     >
        <Component3 showdata={showdata} />
      </div>
    </>
  );
};
