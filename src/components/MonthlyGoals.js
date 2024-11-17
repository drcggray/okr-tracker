import React, { useState, useEffect } from 'react';
import { Check, ChevronUp, ChevronDown } from 'lucide-react';

const MonthlyGoals = ({ goals, updateGoal, toggleCompletion, setSelectedMonth, selectedMonth, selectedQuarter }) => {
  const [isRolledUp, setIsRolledUp] = useState(false);

  const toggleRollUp = () => {
    setIsRolledUp(!isRolledUp);
  };

  useEffect(() => {
    console.log('MonthlyGoals component re-rendered');
  });

  const handleToggleCompletion = (mIndex) => {
    console.log(`Toggling completion for month ${mIndex} in quarter ${selectedQuarter}`);
    
    // Toggle the completed status directly in the goals array
    const updatedGoals = [...goals];
    updatedGoals[mIndex].completed = !updatedGoals[mIndex].completed;
    
    // Update the goals state
    toggleCompletion(updatedGoals);
  };

  // Check if goals is defined and is an array
  const goalsToRender = Array.isArray(goals) ? goals : [];

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold mt-6">Monthly Goals</h3>
        <button
          onClick={toggleRollUp}
          className="p-2 bg-gray-200 rounded flex items-center"
        >
          {isRolledUp ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          <span className="ml-1">Roll {isRolledUp ? 'Down' : 'Up'}</span>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {goalsToRender.map((month, mIndex) => (
          <div
            key={mIndex}
            className={`p-2 border rounded ${selectedMonth === mIndex ? 'bg-blue-100' : ''} ${
              isRolledUp && selectedMonth !== mIndex ? 'hidden' : ''
            }`}
          >
            <div className="flex items-center mb-2">
            <button
  onClick={() => handleToggleCompletion(mIndex)}
  className={`p-2 rounded mr-2 ${month.completed ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
>
  {month.completed ? <Check size={20} /> : <span className="w-5 h-5 block"></span>}
</button>
              <input
                type="text"
                value={month.goal || ''}
                onChange={(e) => updateGoal(mIndex, e.target.value)}
                className={`flex-grow p-2 border rounded ${month.completed ? 'line-through' : ''}`}
                placeholder={`Month ${mIndex + 1} goal`}
              />
            </div>
            <button
              onClick={() => setSelectedMonth(mIndex)}
              className="w-full p-2 bg-blue-500 text-white rounded"
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyGoals;
