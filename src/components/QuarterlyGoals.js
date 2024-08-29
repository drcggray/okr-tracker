import React, { useState } from 'react';
import { Check, ChevronUp, ChevronDown } from 'lucide-react';

const QuarterlyGoals = ({ goals, updateGoal, toggleCompletion, setSelectedQuarter, selectedQuarter }) => {
  const [isRolledUp, setIsRolledUp] = useState(false);

  const toggleRollUp = () => {
    setIsRolledUp(!isRolledUp);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">Quarterly Goals</h3>
        <button
          onClick={toggleRollUp}
          className="p-2 bg-gray-200 rounded flex items-center"
        >
          {isRolledUp ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          <span className="ml-1">Roll {isRolledUp ? 'Down' : 'Up'}</span>
        </button>
      </div>
      {goals.map((quarter, qIndex) => (
        <div
          key={qIndex}
          className={`mb-2 p-2 border rounded ${selectedQuarter === qIndex ? 'bg-blue-100' : ''} ${
            isRolledUp && selectedQuarter !== qIndex ? 'hidden' : ''
          }`}
        >
          <div className="flex items-center">
            <input
              type="text"
              value={quarter.goal || ''}
              onChange={(e) => updateGoal(qIndex, e.target.value)}
              className="flex-grow p-2 border rounded mr-2"
              placeholder={`Q${qIndex + 1} goal`}
            />
            <button
              onClick={() => toggleCompletion(qIndex)}
              className={`p-2 rounded ${quarter.completed ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            >
              {quarter.completed ? <Check size={20} /> : <span className="w-5 h-5 block"></span>}
            </button>
            <button
              onClick={() => setSelectedQuarter(qIndex)}
              className="ml-2 p-2 bg-blue-500 text-white rounded"
            >
              Select
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuarterlyGoals;