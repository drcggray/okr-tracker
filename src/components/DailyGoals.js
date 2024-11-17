import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

const DayLabel = ({ day, goals, isSelected, onClick }) => {
  const isPartiallyFilled = goals.some(goal => typeof goal === 'string' && goal.trim() !== '');
  const isFullyFilled = goals.every(goal => typeof goal === 'string' && goal.trim() !== '');
  const isCompleted = goals.every(goal => typeof goal === 'string' && goal.startsWith('✓ '));

  let className = 'px-4 py-2 rounded-md text-center font-semibold cursor-pointer';
  if (isSelected) {
    className += ' bg-blue-500 text-white';
  } else if (isCompleted) {
    className += ' bg-green-500 text-white';
  } else if (isFullyFilled) {
    className += ' bg-blue-200 text-gray-800';
  } else if (isPartiallyFilled) {
    className += ' bg-gradient-to-r from-blue-200 to-gray-300 text-gray-800';
  } else {
    className += ' bg-gray-600 text-white';
  }

  return (
    <div className={className} onClick={onClick}>
      {day}
    </div>
  );
};

const DailyGoals = ({ goals, setGoals }) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState([]);

  useEffect(() => {
    setSelectedGoals(goals.slice(selectedDay * 2, selectedDay * 2 + 2));
  }, [selectedDay, goals]);

  const saveDayGoals = (newGoals) => {
    setGoals(prevGoals => {
      const updatedGoals = [...prevGoals];
      updatedGoals.splice(selectedDay * 2, 2, ...newGoals);
      return updatedGoals;
    });
  };

  const handleDayChange = (index) => {
    saveDayGoals(selectedGoals); // Save current day’s goals before switching
    setSelectedDay(index); // Change the day
  };

  const updateDailyGoal = (goalIndex, value) => {
    setSelectedGoals(prevGoals => {
      const newGoals = [...prevGoals];
      newGoals[goalIndex] = value;
      return newGoals;
    });
  };

  const toggleDailyGoalCompletion = (goalIndex) => {
    setSelectedGoals(prevGoals => {
      const newGoals = [...prevGoals];
      if (typeof newGoals[goalIndex] === 'string' && newGoals[goalIndex].startsWith('✓ ')) {
        newGoals[goalIndex] = newGoals[goalIndex].slice(2);
      } else {
        newGoals[goalIndex] = `✓ ${newGoals[goalIndex] || ''}`.trim();
      }
      return newGoals;
    });
  };

  const clearDailyGoals = () => {
    setGoals(Array(14).fill(''));
    setSelectedGoals(['', '']);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">Daily Goals</h3>
        <button
          onClick={clearDailyGoals}
          className="p-2 bg-red-500 text-white rounded-md"
        >
          Clear All Daily Goals
        </button>
      </div>
      <div className="flex justify-between mb-4">
        {daysOfWeek.map((day, index) => (
          <DayLabel
            key={day}
            day={day}
            goals={goals.slice(index * 2, index * 2 + 2)}
            isSelected={selectedDay === index}
            onClick={() => handleDayChange(index)}
          />
        ))}
      </div>
      <div className="border rounded-md p-4">
        {selectedGoals.map((goal, goalIndex) => (
          <div key={goalIndex} className="flex items-center mb-2">
            <button
              onClick={() => toggleDailyGoalCompletion(goalIndex)}
              className={`p-2 rounded mr-2 ${typeof goal === 'string' && goal.startsWith('✓ ') ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            >
              {typeof goal === 'string' && goal.startsWith('✓ ') ? <Check size={20} /> : <span className="w-5 h-5 block"></span>}
            </button>
            <input
              type="text"
              value={typeof goal === 'string' && goal.startsWith('✓ ') ? goal.slice(2) : goal || ''}
              onChange={(e) => updateDailyGoal(goalIndex, e.target.value)}
              className={`flex-grow p-2 border rounded-md ${typeof goal === 'string' && goal.startsWith('✓ ') ? 'line-through' : ''}`}
              placeholder={`${daysOfWeek[selectedDay]} goal ${goalIndex + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyGoals;