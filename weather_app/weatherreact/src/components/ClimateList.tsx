import Button from './Button';
import { Link } from 'react-router-dom';
import Signin from './SignInForm';



const ClimateList = () => {
  return (
    <div className='w-full '>
    <div className=" h-[650px] bg-cover gap-12 bg-fixed text-white bg-pink-400 flex flex-col py-4 bg-[linear-gradient(to_right_bottom,rgba(44,44,44,0.1),rgba(16,44,52,0.1)),url('https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] ">
    <div className=" flex flex-row justify-between px-7  ">
      <i className="font-extrabold text-4xl ">SkyWise</i>
      <div className="flex flex-row gap-6">
    {/* <button  className=" px-7 border rounded-lg flex flex-col w-28  items-center py-2 hover:scale-125 transition duration-150 ease-in-out ">Log in</button> */}
    <button  className=" px-7 bg-[#49535C] rounded-lg flex flex-col w-28  items-center py-2 hover:scale-125 transition duration-150 ease-in-out">Sign in</button>
    </div>
     </div>
  <div className="flex flex-row gap-12  py-6 text-white items-center justify-evenly sticky">
  <div className="flex flex-col gap-7 items-center justify-center">
    <div className="flex flex-col gap-5 items-center">
    <i className="text-7xl font-medium h-[100px] tracking-[.2em]">Welcome to SkyWise</i>
    <h3 className='text-4xl'>Travel based on your mood !</h3>
    </div>
    <div className=' bg/blue-30 rounded-md '>
      <div className='m-4  flex flex-col gap-5  items-center'>
        {/* Dont forget! please add these buttons as a card in flex row or grid col span and display in the landing page as a row  */}
    <i className=" font-semibold text-2xl">Choose your climate to trip:</i>
    <nav > 
      <Button/>
      
       
      </nav>
      </div>
      </div>
  </div>
  </div>
  {/* <div className="flex justify-center">
  <button className= ' text-white bg-[#49535C] px-10 hover:scale-125 transition duration-150 py-2 rounded-lg'><Link to="/PlannedTripsPage">My Trip Plan</Link></button>
  </div> */}
  </div> 
  </div>
  );
};

export default ClimateList;