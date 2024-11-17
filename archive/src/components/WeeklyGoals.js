import React, { useState, useEffect, useCallback } from 'react';
import { Check, ChevronUp, ChevronDown } from 'lucide-react';

const WeeklyGoals = ({ 
  weeklyGoals, 
  updateGoal, 
  toggleCompletion, 
  setSelectedWeek, 
  selectedWeek, 
  selectedQuarter, 
  selectedMonth
}) => {
  const [isRolledUp, setIsRolledUp] = useState(false);

  const toggleRollUp = useCallback(() => {
    setIsRolledUp(prev => !prev);
  }, []);

  useEffect(() => {
    console.log('WeeklyGoals component re-rendered');
    console.log('Current weeklyGoals:', weeklyGoals);
  }, [weeklyGoals]);

  const handleToggleCompletion = useCallback((wIndex) => {
    console.log(`Toggling completion for week ${wIndex} in quarter ${selectedQuarter}, month ${selectedMonth}`);
    console.log(`Current completion status: ${weeklyGoals[wIndex].completed}`);
    toggleCompletion(wIndex);
  }, [toggleCompletion, weeklyGoals, selectedQuarter, selectedMonth]);

  // Check if weeklyGoals is defined and is an array
  const goalsToRender = Array.isArray(weeklyGoals) ? weeklyGoals : [];

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
        {goalsToRender.map((week, wIndex) => {
          console.log(`Rendering week ${wIndex}, completed: ${week.completed}`);
          return (
            <div
              key={`week-${wIndex}-${week.completed}`}
              className={`p-2 border rounded ${selectedWeek === wIndex ? 'bg-blue-100' : ''} ${
                isRolledUp && selectedWeek !== wIndex ? 'hidden' : ''
              }`}
            >
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  value={week.goal || ''}
                  onChange={(e) => updateGoal(wIndex, e.target.value)}
                  className="flex-grow p-2 border rounded mr-2"
                  placeholder={`Week ${wIndex + 1} goal`}
                />
                <button
                  onClick={() => handleToggleCompletion(wIndex)}
                  className={`p-2 rounded ${week.completed ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                >
                  {week.completed ? <Check size={20} /> : <span className="w-5 h-5 block"></span>}
                </button>
              </div>
              <button
                onClick={() => setSelectedWeek(wIndex)}
                className="w-full p-2 bg-blue-500 text-white rounded"
              >
                Select
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(WeeklyGoals);