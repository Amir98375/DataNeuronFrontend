import React from 'react'
import '../component.css'
 const Component3 = React.memo(({showdata}) => {


  return (
    <div className='compContainer3'>
      <div className='childcon1'>
        <img src={showdata.imageUrl} alt="" />
      </div>
      <div className='childcon2'>
        <h2>User Name:{showdata.userName}</h2>
        <h2>Designation:{showdata.designation}</h2>
      </div>
    </div>
  )
})
export default Component3
