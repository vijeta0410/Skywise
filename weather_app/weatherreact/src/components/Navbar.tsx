import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <div className="bg-pink-400 bg-cover bg-fixed text-white h-[400px] bg-[linear-gradient(to_right_bottom,rgba(44,44,44,0.6),rgba(16,44,52,0.1)),url('https://media2.thrillophilia.com/images/photos/000/178/977/original/1573729587_shutterstock_704449474.jpg?gravity=center&width=1280&height=642&crop=fill&quality=auto&fetch_format=auto&flags=strip_profile&format=jpg&sign_url=true')]">
        <div className=" flex flex-row justify-between px-7 py-6 h-[100px]">
      <i className="font-extrabold text-4xl ">SkyWise</i>
      <div className="flex justify-center">
  <button className= ' text-white border px-10 hover:scale-125 transition duration-150 py-2 rounded-lg'><Link to="/PlannedTripsPage">My Trip Plan</Link></button>
  </div>
      {/* <div className="flex flex-row gap-6">
    <button  className=" px-7 border rounded-lg flex flex-col w-28  items-center py-2 hover:scale-125 transition duration-150 ease-in-out ">Log in</button>
    <button  className=" px-7 bg-[#49535C] rounded-lg flex flex-col w-28  items-center py-2 hover:scale-125 transition duration-150 ease-in-out">Sign in</button>
    </div> */}
     </div>
       <div className='flex items-center justify-center rounded-5xl'>
      <div className='backdrop-blur bg/blue-30 rounded-md '>
      <div className='m-4  flex flex-col gap-5  items-center'>
        {/* Dont forget! please add these buttons as a card in flex row or grid col span and display in the landing page as a row  */}
    <i className=" font-semibold text-2xl">Choose your climate to trip:</i>
    <nav className='m-5'> 
      <Button/>
      </nav>
      </div>
      </div>
      </div>
      
    </div>
    </div>
  )
}

export default Navbar