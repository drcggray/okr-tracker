import React, { useState } from 'react';
import { Check, ChevronUp, ChevronDown } from 'lucide-react';

const WeeklyGoals = ({ 
  weeklyGoals = [], 
  updateGoal, 
  toggleCompletion, 
  setSelectedWeek, 
  selectedWeek 
}) => {
  const [isRolledUp, setIsRolledUp] = useState(false);

  const toggleRollUp = () => setIsRolledUp(prev => !prev);

  const handleToggleCompletion = (wIndex) => {
    console.log(`Toggling completion for week ${wIndex}`);
    
    // Toggle the completed status directly in the goals array
    const updatedGoals = [...weeklyGoals];
    updatedGoals[wIndex].completed = !updatedGoals[wIndex].completed;
    
    // Update the goals state
    toggleCompletion(updatedGoals);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold mt-6">Weekly Goals</h3>
        <button
          onClick={toggleRollUp}
          className="p-2 bg-gray-200 rounded flex items-center"
        >
          {isRolledUp ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          <span className="ml-1">Roll {isRolledUp ? 'Down' : 'Up'}</span>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {weeklyGoals.map((week, wIndex) => (
          <div
            key={`week-${wIndex}-${week.completed}`}
            className={`p-2 border rounded ${selectedWeek === wIndex ? 'bg-blue-100' : ''} ${
              isRolledUp && selectedWeek !== wIndex ? 'hidden' : ''
            }`}
          >
            <div className="flex items-center mb-2">
            <button
              onClick={() => handleToggleCompletion(wIndex)}
              className={`p-2 rounded mr-2 ${week.completed ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            >
              {week.completed ? <Check size={20} /> : <span className="w-5 h-5 block"></span>}
            </button>
              <input
                type="text"
                value={week.goal || ''}
                onChange={(e) => updateGoal(wIndex, e.target.value)}
                className={`flex-grow p-2 border rounded ${week.completed ? 'line-through' : ''}`}
                placeholder={`Week ${wIndex + 1} goal`}
              />
            </div>
            <button
              onClick={() => setSelectedWeek(wIndex)}
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
export default WeeklyGoals;