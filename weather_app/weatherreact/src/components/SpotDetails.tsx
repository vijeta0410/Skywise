// SpotDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ClimateList from './ClimateList';
import Footer from './Footer';
import Navbar from './Navbar';

interface Spot {
  spot_id: number;
  spot_name: string;
  spot_description: string;
  distance:string;
  temperature:string;
  images:string;
}

const SpotDetails = () => {
  const auth_token = "fgi3j4593u3848344resd443"; 
  const { destinationId } = useParams();
  const [spots, setSpots] = useState<Spot[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const spotsResponse = await fetch(`/api/spots/${destinationId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth_token}`,
          },
        });
        const spotsData = await spotsResponse.json();
        setSpots(spotsData?.results || []);
      } catch (error) {
        setError("Failed to fetch spot details");
      }
    };

    fetchSpots();
  }, [auth_token, destinationId]);

  return (
    <div className='w-full h-screen'>
      <div className='flex flex-col'>
      {/* <div><ClimateList/></div> */}
      <div><Navbar/></div>
      {error && <p>Error: {error}</p>}
      <div className='m-12 flex flex-col gap-7 bg-[#BA8F0D] shadow-2xl rounded-lg'>
        <div className='m-5 flex flex-col gap-9'>
      <h2 className='text-2xl font-bold'>Spot Details for Destination {destinationId} :</h2>
      <div className='mb-9 grid grid-cols-3 gap-7 ml-20 mr-20'>
        {spots.map((spot) => (
          <div key={spot.spot_id} className=' bg-slate-100 flex flex-col  gap-14  col-span-1 mb-4 rounded-lg shadow-xl hover:scale-105 transition-transform duration-300'>
            <div className='m-5 flex flex-col gap-3'>
            <h3 className='text-2xl font-bold'>{spot.spot_name}</h3>
            <div className='h-[215px] bg-black object-fill'><img className='h-full w-full' src={spot.images} alt="spot_image" /></div>
            {/* <div>{spot.images}</div> */}
             
            <div className='overflow-y-auto h-36'>{spot.spot_description}</div>
            
            <p className='font-bold'>{spot.distance}</p>
            <div className='flex flex-row gap-2'>
            <p className='text-xl'>{spot.temperature}</p>
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-cloud-sun"><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/></svg></div>
            {/* Add more details based on your Spot interface */}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
    </div>
    <Footer/></div>
  );
};

export default SpotDetails;