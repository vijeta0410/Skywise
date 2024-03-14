// PlannedTripsPage.js
import React, { useState, useEffect } from 'react';

import Navbar from './Navbar';

interface PlannerItem {
  planner_id: number;
  destination_name: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  bookings: string;
}

interface UserData {
  user_id: number;
}

const PlannedTripsPage: React.FC = () => {
  const [plannedTrips, setPlannedTrips] = useState<PlannerItem[]>([]);
  const auth_token = "fgi3j4593u3848344resd443";
  const [selectedTrip, setSelectedTrip] = useState<PlannerItem | null>(null);
  const [newStartDate, setNewStartDate] = useState<string>('');
  const [newEndDate, setNewEndDate] = useState<string>('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    };

    return date.toLocaleString(undefined, options);
  };

  const handleGetPlannedTrips = async () => {
    try {
      const userResponse = await fetch(`/api/user/get/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`,
        }
      });

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user ID');
      }

      const userData = await userResponse.json();
      const userId = userData?.results?.[0]?.user_id;

      const tripsResponse = await fetch(`/api/plan/get/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        }
      });

      if (!tripsResponse.ok) {
        throw new Error('Failed to fetch planned trips');
      }

      const trips = await tripsResponse.json();

      if (!trips || !trips.results || trips.results.length === 0) {
        throw new Error('No planned trips found');
      }

      setPlannedTrips(trips.results);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  const handleDeleteTrip = async (id: number) => {
    try {
      const response = await fetch(`/api/plan/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`,
        },
      });

      if (response.ok) {
        setPlannedTrips((prevTrips) => prevTrips.filter((trip) => trip.planner_id !== id));
      } else {
        console.error('Failed to delete planned trip');
      }
    } catch (error) {
      console.error('An error occurred while deleting planned trip:', error);
    }
  };

  const handleDeleteAllPlans = async () => {
    try {
      const response = await fetch('/api/plan/delete/all', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`,
        },
      });

      if (response.ok) {
        setPlannedTrips([]);
      } else {
        console.error('Failed to delete all planned trips');
      }
    } catch (error) {
      console.error('An error occurred while deleting all planned trips:', error);
    }
  };

  const handleUpdateDateClick = (trip: PlannerItem) => {
    setSelectedTrip(trip);
    setNewStartDate(trip.start_date);
    setNewEndDate(trip.end_date);
  };

  const handleUpdateDate = async () => {
    if (selectedTrip) {
      try {
        const response = await fetch(`/api/plan/update/${selectedTrip.planner_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`,
          },
          body: JSON.stringify({
            start_date: newStartDate,
            end_date: newEndDate,
            updated_at: new Date().toISOString(),
          }),
        });

        if (response.ok) {
          setPlannedTrips((prevTrips) =>
            prevTrips.map((trip) =>
              trip.planner_id === selectedTrip.planner_id
                ? { ...trip, start_date: newStartDate, end_date: newEndDate, updated_at: new Date().toISOString(), }
                : trip
            )
          );
          setSelectedTrip(null);
        } else {
          console.error('Failed to update planned trip date');
        }
      } catch (error) {
        console.error('An error occurred while updating planned trip date:', error);
      }
    }
  };

  return (
    <div className='flex flex-col'>
      <div><Navbar /></div>
      <div className='m-8 flex flex-col gap-7 items-center bg-[#BA8F0D] p-6 rounded-xl'>
        <h2 className='text-2xl font-semibold '>My Planned Trips:</h2>
        <div className='flex items-center text-white flex-row gap-5 '>
          <button onClick={handleDeleteAllPlans} className='bg-[#BA7438] px-6 py-2 hover:bg-[#c78e5c] hover:scale-105 transition duration-150 rounded-lg font-bold'>Delete All Plans</button>
          <label className='flex flex-row gap-2 text-xl'>
            Username :  
            <input className='text-black py-2 rounded-lg bg-slate-300 '
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className='text-xl'>Password :
            <input type="password" placeholder='password' className='bg-slate-300 py-2 px-6 rounded-lg text-black' />
          </label>
          <button onClick={handleGetPlannedTrips} className='bg-[#BA7438] py-2 px-6 rounded-lg font-bold'>Get Planned Trips</button>
        </div>
        <div className=' flex flex-col gap-12'>
          {plannedTrips.map((trip) => (
            <div className='bg-gray-300 rounded-lg shadow-lg'>
              <div className='m-6 flex flex-col '>
                <li key={trip.planner_id}>
                  <strong>{trip.destination_name}</strong>
                  <p>Start Date: {trip.start_date}</p>
                  <p>End Date: {trip.end_date}</p>
                  <p>Created at:{formatDate(trip.created_at)}</p>
                  <p>Updated at:{formatDate(trip.updated_at)}</p>
                  <div className='flex flex-row gap-5 m-4'>
                    <button onClick={() => handleDeleteTrip(trip.planner_id)} className='bg-[#BA7438] hover:  hover:scale-105 transition duration-150 rounded-lg px-3 py-1 text-white'>Delete Trip</button>
                    <button onClick={() => handleUpdateDateClick(trip)} className='bg-[#BA7438] hover:  hover:scale-105 transition duration-150 rounded-lg px-3 py-1 text-white'>Update Trip Date</button>
                  </div>
                  {selectedTrip && selectedTrip.planner_id === trip.planner_id && (
                    <div className='flex flex-col gap-4 '>
                      <strong>Update My Trip Date</strong>
                      <label>
                        New Start Date:
                        <input
                          type="date"
                          value={newStartDate}
                          onChange={(e) => setNewStartDate(e.target.value)} />
                      </label>
                      <label>
                        New End Date:
                        <input
                          type="date"
                          value={newEndDate}
                          onChange={(e) => setNewEndDate(e.target.value)}
                        />
                      </label>
                      <button onClick={handleUpdateDate} className='bg-[#BA7438]  hover:scale-105 transition duration-150 rounded-lg px-3 py-1 text-white flex items-center justify-center ' >Update Date</button>
                    </div>
                  )}
                </li>
              </div>
            </div>))
          }
        </div>
      </div>
    </div>
  );
};

export default PlannedTripsPage;