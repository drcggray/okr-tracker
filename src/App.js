import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Categories from './components/Categories';
import AnnualGoal from './components/AnnualGoal';
import QuarterlyGoals from './components/QuarterlyGoals';
import MonthlyGoals from './components/MonthlyGoals';
import WeeklyGoals from './components/WeeklyGoals';
import DailyGoals from './components/DailyGoals';
import { categories, initializeGoals } from './utils/goalUtils';
import useLocalStorage from './hooks/useLocalStorage';
import useDarkMode from './hooks/useDarkMode';

const App = () => {
  const [goals, setGoals] = useLocalStorage('goals', initializeGoals());
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [dailyGoals, setDailyGoals] = useLocalStorage('dailyGoals', Array(14).fill(''));
  const [darkMode, toggleDarkMode] = useDarkMode();

  useEffect(() => {
    console.log('Goals state updated:', goals);
    if (selectedQuarter !== null && selectedMonth !== null) {
      console.log('Current weekly goals:', goals[currentCategory]?.quarterly[selectedQuarter]?.monthly[selectedMonth]?.weekly);
    }
  }, [goals, currentCategory, selectedQuarter, selectedMonth]);

  const updateGoal = useCallback((level, index, value, dayIndex, goalIndex) => {
    setGoals(prevGoals => {
      const newGoals = { ...prevGoals };
      let target = newGoals[currentCategory];

      if (!target) {
        console.error(`Category ${currentCategory} not found in goals`);
        return prevGoals;
      }

      switch (level) {
        case 'annual':
          target.annual = value;
          break;
        case 'quarterly':
          if (target.quarterly[index]) {
            target.quarterly[index] = { ...target.quarterly[index], goal: value };
          }
          break;
        case 'monthly':
          if (selectedQuarter !== null && target.quarterly[selectedQuarter]?.monthly[index]) {
            target.quarterly[selectedQuarter].monthly[index] = {
              ...target.quarterly[selectedQuarter].monthly[index],
              goal: value
            };
          }
          break;
        case 'weekly':
          if (selectedQuarter !== null && selectedMonth !== null && 
              target.quarterly[selectedQuarter]?.monthly[selectedMonth]?.weekly[index]) {
            target.quarterly[selectedQuarter].monthly[selectedMonth].weekly[index] = {
              ...target.quarterly[selectedQuarter].monthly[selectedMonth].weekly[index],
              goal: value
            };
          }
          break;
        case 'daily':
          if (selectedQuarter !== null && selectedMonth !== null && selectedWeek !== null &&
              target.quarterly[selectedQuarter]?.monthly[selectedMonth]?.weekly[selectedWeek]?.dailyGoals[dayIndex]) {
            target.quarterly[selectedQuarter].monthly[selectedMonth].weekly[selectedWeek].dailyGoals[dayIndex][goalIndex] = value;
          }
          break;
        default:
          console.error(`Unknown level: ${level}`);
          return prevGoals;
      }

      console.log(`Updated ${level} goal:`, newGoals);
      return newGoals;
    });
  }, [currentCategory, selectedQuarter, selectedMonth, selectedWeek, setGoals]);

  const toggleCompletion = useCallback((level, indices) => {
    console.log(`Toggling completion for ${level}:`, indices);
    setGoals(prevGoals => {
      console.log('Previous goals:', prevGoals);
      const newGoals = { ...prevGoals };
      let target = newGoals[currentCategory];

      switch (level) {
        case 'quarterly':
          if (target.quarterly[indices[0]]) {
            target.quarterly[indices[0]] = {
              ...target.quarterly[indices[0]],
              completed: !target.quarterly[indices[0]].completed
            };
          }
          break;
        case 'monthly':
          if (target.quarterly[indices[0]]?.monthly[indices[1]]) {
            target.quarterly[indices[0]].monthly[indices[1]] = {
              ...target.quarterly[indices[0]].monthly[indices[1]],
              completed: !target.quarterly[indices[0]].monthly[indices[1]].completed
            };
          }
          break;
        case 'weekly':
          if (target.quarterly[indices[0]]?.monthly[indices[1]]?.weekly[indices[2]]) {
            target.quarterly[indices[0]].monthly[indices[1]].weekly[indices[2]] = {
              ...target.quarterly[indices[0]].monthly[indices[1]].weekly[indices[2]],
              completed: !target.quarterly[indices[0]].monthly[indices[1]].weekly[indices[2]].completed
            };
          }
          break;
        case 'daily':
          if (target.quarterly[indices[0]]?.monthly[indices[1]]?.weekly[indices[2]]?.dailyGoals[indices[3]]) {
            target.quarterly[indices[0]].monthly[indices[1]].weekly[indices[2]].dailyGoals[indices[3]] = {
              ...target.quarterly[indices[0]].monthly[indices[1]].weekly[indices[2]].dailyGoals[indices[3]],
              completed: !target.quarterly[indices[0]].monthly[indices[1]].weekly[indices[2]].dailyGoals[indices[3]].completed
            };
          }
          break;
        default:
          console.error(`Unknown level: ${level}`);
          return prevGoals;
      }

      console.log('Updated goals:', newGoals);
      return newGoals;
    });
  }, [currentCategory, setGoals]);

  const memoizedComponents = useMemo(() => ({
    categories: (
      <Categories
        categories={categories}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
    ),
    annualGoal: (
      <AnnualGoal
        key={`annual-${currentCategory}`}
        annualGoal={goals[currentCategory]?.annual || ''}
        updateGoal={(value) => updateGoal('annual', null, value)}
      />
    ),
    quarterlyGoals: (
      <QuarterlyGoals
        key={`quarterly-${currentCategory}`}
        goals={goals[currentCategory]?.quarterly || []}
        updateGoal={(index, value) => updateGoal('quarterly', index, value)}
        toggleCompletion={(index) => toggleCompletion('quarterly', [index])}
        selectedQuarter={selectedQuarter}
        setSelectedQuarter={setSelectedQuarter}
      />
    ),
    monthlyGoals: selectedQuarter !== null && (
      <MonthlyGoals
        key={`monthly-${currentCategory}-${selectedQuarter}`}
        goals={goals[currentCategory]?.quarterly[selectedQuarter]?.monthly || []}
        updateGoal={(index, value) => updateGoal('monthly', index, value)}
        toggleCompletion={(index) => toggleCompletion('monthly', [selectedQuarter, index])}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedQuarter={selectedQuarter}
      />
    ),
    weeklyGoals: selectedQuarter !== null && selectedMonth !== null && (
      <WeeklyGoals
        key={`weekly-${currentCategory}-${selectedQuarter}-${selectedMonth}`}
        weeklyGoals={goals[currentCategory]?.quarterly[selectedQuarter]?.monthly[selectedMonth]?.weekly || []}
        updateGoal={(index, value) => updateGoal('weekly', index, value)}
        toggleCompletion={(index) => toggleCompletion('weekly', [selectedQuarter, selectedMonth, index])}
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
        selectedQuarter={selectedQuarter}
        selectedMonth={selectedMonth}
      />
    ),
    dailyGoals: (
      <DailyGoals
        key={`daily-${JSON.stringify(dailyGoals)}`}
        goals={dailyGoals}
        setGoals={setDailyGoals}
      />
    ),
  }), [
    goals, currentCategory, updateGoal, toggleCompletion,
    selectedQuarter, selectedMonth, selectedWeek,
    dailyGoals, setDailyGoals,
    darkMode,
  ]);

  return (
    <div className={`container mx-auto p-4 ${darkMode ? 'dark-mode' : ''}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">OKR Tracker</h1>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md"
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
      
      {memoizedComponents.categories}
      
      <div className="mt-4">
        {memoizedComponents.annualGoal}
        {memoizedComponents.quarterlyGoals}
        {memoizedComponents.monthlyGoals}
        {memoizedComponents.weeklyGoals}
        {memoizedComponents.dailyGoals}
      </div>
    </div>
  );
};

export default App;