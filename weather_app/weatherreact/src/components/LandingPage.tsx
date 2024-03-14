import React from 'react'
import ClimateList from './ClimateList'
import Footer from './Footer'


const LandingPage = () => {
    

  return (
    <div className='flex flex-col '>
        <ClimateList/>
       
    <div className='flex flex-col gap-9'> 
      <Footer/>
    </div>
    </div>
  )
}

export default LandingPage