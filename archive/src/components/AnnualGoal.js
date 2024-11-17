import React from 'react';

const AnnualGoal = ({ annualGoal, updateGoal }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Annual Goal</h2>
      <input
        type="text"
        value={annualGoal}
        onChange={(e) => updateGoal(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter annual goal"
      />
    </div>
  );
};

export default AnnualGoal;