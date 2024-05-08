
import axios from 'axios'
import React from 'react'
import { trackPromise } from 'react-promise-tracker'
import { ReactUtilityTable } from 'react-utility-table'
import Swal from 'sweetalert2'

 const Component2 = React.memo(({tableData,getRowData,apiCall}) => {
  const Delete=(e,rowData)=>{
    debugger
    let id=rowData._id
    let url='http://localhost:5000/addDetails'
    trackPromise(axios.delete(`${url}/${id}`)).then((resp)=>{
      console.log(resp,'response delete')
      Swal.fire({
        title: "Done",
        text: "Data uploaded successfully",
        icon: "success",
    }).then((el)=>{
      if(el.isConfirmed){
      apiCall()
      }
    })
    })
    .catch((err)=>{
      Swal.fire({
        title: "Delete",
        text: err.message,
        icon: "error",
    }).then((el)=>{
      if(el.isConfirmed){
        // apiCall()
      }
    })
    })
    

  }
  return (
    <div>
             <ReactUtilityTable
          
            options={{
              maxBodyHeight: 100,
              minBodyHeight: 170,
              paging: false,

              headerStyle: {
                backgroundColor: "skyblue",
                color: "white",
                header:'none',
                
                whiteSpace: "nowrap",
              },

              search: false,
              // actionsColumnIndex: -1,
            }}
            title={""}
            style={{
              // border: "1px solid #ccc",
              width: "90%",
            }}
            data={tableData}
            columns={[
              {
                title: "User Name",
                field: "userName",
            
            
              },
              {
                title: "Designation",
                field: "designation",
          
            
              },
              {
                title: "Show Details",
                field: "",
                render:(rowData)=>{
                  return(
                    <button onClick={(e)=>{getRowData(e,rowData)}}>show</button>
                  )
                }
          
            
              },
              {
                title: "Delete",
                field: "",
                render:(rowData)=>{
                  return(
                    <button onClick={(e)=>{Delete(e,rowData)}}>Delete</button>
                  )
                }
          
            
              },
          
             
             
  
            ]}
          ></ReactUtilityTable>
    </div>
  )
})
export default Component2
