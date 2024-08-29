import React from 'react';

const WorkTimer = ({ selectedDuration, setSelectedDuration, startTimer, isTimerRunning, remainingTime }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-2">Work Timer</h2>
      <select 
        value={selectedDuration} 
        onChange={(e) => setSelectedDuration(Number(e.target.value))}
        className="mr-2 p-2 border rounded"
      >
        <option value={15}>15 minutes</option>
        <option value={30}>30 minutes</option>
        <option value={60}>60 minutes</option>
        <option value={90}>90 minutes</option>
      </select>
      <button 
        onClick={startTimer}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={isTimerRunning}
      >
        Start Timer
      </button>
      {remainingTime > 0 && (
        <p className="mt-2">
          Time remaining: {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}
        </p>
      )}
    </div>
  );
};

export default WorkTimer;