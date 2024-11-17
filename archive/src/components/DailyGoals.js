import React, { useState } from 'react';
import { Check } from 'lucide-react';

const DayLabel = ({ day, goals, isSelected, onClick }) => {
  const isPartiallyFilled = goals.some(goal => goal.trim() !== '');
  const isFullyFilled = goals.every(goal => goal.trim() !== '');
  const isCompleted = goals.every(goal => goal.startsWith('✓ '));

  let className = 'px-4 py-2 rounded-md text-center font-semibold cursor-pointer';
  if (isSelected) {
    className += ' bg-blue-500 text-white';
  } else if (isCompleted) {
    className += ' bg-green-500 text-white';
  } else if (isFullyFilled) {
    className += ' bg-blue-200';
  } else if (isPartiallyFilled) {
    className += ' bg-gradient-to-r from-blue-200 to-white';
  } else {
    className += ' bg-gray-200';
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

  const updateDailyGoal = (index, value) => {
    const newGoals = [...goals];
    newGoals[index] = value;
    setGoals(newGoals);
  };

  const toggleDailyGoalCompletion = (index) => {
    const newGoals = [...goals];
    if (newGoals[index].startsWith('✓ ')) {
      newGoals[index] = newGoals[index].slice(2);
    } else {
      newGoals[index] = '✓ ' + newGoals[index];
    }
    setGoals(newGoals);
  };

  const clearDailyGoals = () => {
    setGoals(Array(14).fill(''));
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mt-6 mb-2">Daily Goals</h3>
      <div className="flex justify-between mb-4">
        {daysOfWeek.map((day, index) => (
          <DayLabel
            key={day}
            day={day}
            goals={goals.slice(index * 2, index * 2 + 2)}
            isSelected={selectedDay === index}
            onClick={() => setSelectedDay(index)}
          />
        ))}
      </div>
      <div className="border rounded-md p-4">
        {goals.slice(selectedDay * 2, selectedDay * 2 + 2).map((goal, goalIndex) => (
          <div key={goalIndex} className="flex items-center mb-2">
            <input
              type="text"
              value={goal.startsWith('✓ ') ? goal.slice(2) : goal}
              onChange={(e) => updateDailyGoal(selectedDay * 2 + goalIndex, e.target.value)}
              className="flex-grow p-2 border rounded-md mr-2"
              placeholder={`${daysOfWeek[selectedDay]} goal ${goalIndex + 1}`}
            />
            <button
              onClick={() => toggleDailyGoalCompletion(selectedDay * 2 + goalIndex)}
              className={`p-2 rounded-md ${goal.startsWith('✓ ') ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            >
              {goal.startsWith('✓ ') && (
                <>
                  <Check size={20} />
                  <span className="sr-only">✓</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={clearDailyGoals}
        className="mt-4 p-2 bg-red-500 text-white rounded-md"
      >
        Clear All Daily Goals
      </button>
    </div>
  );
};

export default DailyGoals;