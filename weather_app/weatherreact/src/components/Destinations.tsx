// Destinations.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ClimateList from './ClimateList';
import Footer from './Footer';
import PlannedTripsPage from './PlannedTripsPage';
import TripPlanner from './TripPlanner';
import Navbar from './Navbar';

interface PlannerItem {
  destinationName: string;
  startDate: string;
  endDate: string;
}

interface Destination {
  destination_id: number;
  destination_name: string;
  dest_description: string;
  temperature: string;
  season: string;
  wind_speed: string;
  distance: string;
  images: string;
}

const Destinations: React.FC = () => {
  const auth_token = "fgi3j4593u3848344resd443"; // Replace with your actual auth token
  const { climateId } = useParams();
  const navigate = useNavigate();
  const [weatherId, setWeatherId] = useState<number | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedDestinations, setSelectedDestinations] = useState<Destination[]>([]);
  const [plannedTrips, setPlannedTrips] = useState<PlannerItem[]>([]);
  const [latestPlannerId, setLatestPlannerId] = useState<number>(1);
  const [username, setUsername] = useState<string>(''); // State for username input
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const toggleSelectedDestination = (destination: Destination) => {
    setSelectedDestinations((prevDestinations) => {
      const isSelected = prevDestinations.some((d) => d.destination_id === destination.destination_id);
      return isSelected
        ? prevDestinations.filter((d) => d.destination_id !== destination.destination_id)
        : [...prevDestinations, destination];
    });
  };

  const handleAddToPlanner = async () => {
    if (username && startDate && endDate && selectedDestinations.length > 0) {
      try {
        // Fetch user_id based on username
        const userResponse = await fetch(`/api/user/get/${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
          }
        });
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user ID');
        }
        const userData = await userResponse.json();
        const user_id = userData?.results?.[0]?.user_id;

        // Add the trip to the planner using the retrieved user_id
        await Promise.all(selectedDestinations.map(async (destination) => {
          const { destination_id, destination_name } = destination;
          const response = await fetch('/api/plan/new', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth_token}`,
            },
            body: JSON.stringify({
              user_id,
              destination_id,
              destination_name,
              start_date: startDate.toISOString().split('T')[0],
              end_date: endDate.toISOString().split('T')[0],
              created_at: new Date().toISOString()
            })
          });
          if (!response.ok) {
            throw new Error(`Failed to add trip to the database: ${response.statusText}`);
          }
        }));

        setLatestPlannerId((prevId) => prevId + 1);
        // navigate('/planned-trips');

      } catch (error) {
        console.error('An error occurred while adding the trip:', error);
        setError("Failed to add trip. Please try again.");
      }
    } else {
      setError("Please fill in all fields and select at least one destination.");
    }
  };

  const fetchWeatherAndDestinations = async () => {
    try {
      const weatherResponse = await fetch(`/api/weather_id/${climateId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth_token}`,
        },
      });

      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather ID');
      }

      const weatherData = await weatherResponse.json();
      const fetchedWeatherId = weatherData?.results?.[0]?.weather_id;

      if (!fetchedWeatherId) {
        throw new Error('Weather ID not available');
      }

      setWeatherId(fetchedWeatherId);

      const destinationsResponse = await fetch(`/api/destination/${fetchedWeatherId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth_token}`,
        },
      });

      if (!destinationsResponse.ok) {
        throw new Error('Failed to fetch destinations');
      }

      const destinationsData = await destinationsResponse.json();
      setDestinations(destinationsData?.results || []);
    } catch (error) {
      setError(`Failed to fetch data: ${error}`);
    }
  };

  useEffect(() => {
    fetchWeatherAndDestinations();
  }, [auth_token, climateId]);

  if (!climateId) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full h-screen">
      <div className='flex flex-col'>
        <Navbar />
        <div className='bg-fixed'>
          <div className='flex flex-col gap-7 m-12 mb-20 rounded-3xl p-4 bg-[#BA8F0D] shadow-2xl'>
            {error && <p>Error: {error}</p>}
            <h2 className='text-2xl font-bold'>Destinations for {climateId} climate:</h2>
            <div>
              <div className='grid grid-cols-3 sm:columns-1 md:columns-2 lg:columns-3 gap-7 ml-20 mr-20 mt-4'>
                {destinations.map((destination) => (
                  <div className='bg-slate-100 col-span-1 flex shadow-xl rounded-md hover:scale-105 transition-transform duration-300 mb-20' style={{ minWidth: '250px' }} key={destination.destination_id}>
                    <div className='m-5 flex justify-center flex-col gap-4 w-full'>
                      <h3 className='font-bold text-2xl'>{destination.destination_name}</h3>
                      <div className="h-[215px] bg-black object-fill"><img src={destination.images} alt="dest_img" className="h-full w-full" /></div>
                      <div className='overflow-y-auto h-36'>{destination.dest_description}</div>
                      <div className='flex flex-row gap-2'>
                        <h3 className='text-xl'>{destination.temperature}</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud-sun"><path d="M12 2v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="M20 12h2" /><path d="m19.07 4.93-1.41 1.41" /><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" /><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" /></svg>
                      </div>
                      <h3 className='font-bold'>{destination.distance}</h3>
                      <div className='font-bold text-xl'>
                        <p>Best season to visit:</p>
                        <p className='text-green-500'>{destination.season}</p>
                      </div>
                      <div className='flex justify-center flex-col gap-4 m-3'>
                        <button className='rounded-xl px-5 bg-[#BA7438] text-white text-xl hover:py-1 flex item-center'><Link to={`/spots/${destination.destination_id}`}>View Spots here</Link></button>
                        {selectedDestinations.some(dest => dest.destination_id === destination.destination_id) && (
                          <input
                            type="text" className='text-black py-3 bg-slate-300 px-3 rounded-xl'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                          />
                        )}
                        <button className='rounded-xl px-5 bg-[#BA7438] text-white text-xl hover:py-1 flex item-center' onClick={() => toggleSelectedDestination(destination)}>Add to Planner</button>
                      </div>
                      {selectedDestinations.length > 0 && (
                        <TripPlanner
                          destinationNames={selectedDestinations.map((dest) => dest.destination_name)}
                          onAddToPlanner={handleAddToPlanner}
                          setStartDate={setStartDate}
                          setEndDate={setEndDate}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Destinations;