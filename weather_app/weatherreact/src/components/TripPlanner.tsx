import React, { useState } from 'react';

interface TripPlannerProps {
  destinationNames: string[];
  onAddToPlanner: (startDate: Date, endDate: Date) => Promise<void>;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const TripPlanner: React.FC<TripPlannerProps> = ({
  destinationNames,
  onAddToPlanner,
  setStartDate,
  setEndDate,
}) => {
  const [startDate, setLocalStartDate] = useState<Date | null>(null);
  const [endDate, setLocalEndDate] = useState<Date | null>(null);

  const handleAddToPlanner = async () => {
    if (startDate && endDate) {
      await onAddToPlanner(startDate, endDate);
    } else {
      console.error('Invalid start date or end date');
    }
  };

  return (
    <div className='flex flex-col gap-3'>      
      <h2 className='text-xl font-semibold'>Trip Planner:</h2>
      <p>Selected Destinations:</p>
      <div>
        {destinationNames.map((name, index) => (
          <div key={index}>{name}</div>
        ))}
      </div>

      {/* Form for entering start and end dates */}
      <div className='flex flex-col gap-3'>
      <div className='grid grid-row-3 gap-3'>
       <div className='col-span-1 '> Start Date:
        <input className='bg-gray-400 px-3 rounded-lg col-span-2 '
          type="date"
          value={startDate ? startDate.toISOString().slice(0, 10) : ''}
          onChange={(e) => {
            setLocalStartDate(new Date(e.target.value));
            setStartDate(new Date(e.target.value));
          }}
        /></div>
      </div>
      <div>
        End Date:
        <input className='bg-gray-400 px-3 rounded-lg '
          type="date"
          value={endDate ? endDate.toISOString().slice(0, 10) : ''}
          onChange={(e) => {
            setLocalEndDate(new Date(e.target.value));
            setEndDate(new Date(e.target.value));
          }}
        />
      </div></div>

      <button className='text-white bg-orange-400 py-2 rounded-lg hover:bg-orange-300 ' onClick={handleAddToPlanner}>Add to Planner</button>
    </div>
  );
};

export default TripPlanner;