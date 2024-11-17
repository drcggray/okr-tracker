// Define categories
export const categories = [
  'Finance', 'Career', 'Health', 'Intimacy', 
  'Parent', 'Social', 'Hobbies', 'Business'
];

// Initialize goals structure
export const initializeGoals = () => {
  const goalStructure = {};
  categories.forEach(category => {
    goalStructure[category] = {
      annual: '',
      quarterly: Array(4).fill(null).map(() => ({
        goal: '',
        completed: false,
        monthly: Array(3).fill(null).map(() => ({
          goal: '',
          completed: false,
          weekly: Array(4).fill(null).map(() => ({
            goal: '',
            completed: false
          }))
        }))
      }))
    };
  });
  return goalStructure;
};

// Load goals from localStorage
export const loadGoals = () => {
  try {
    const savedGoals = localStorage.getItem('goals');
    return savedGoals ? JSON.parse(savedGoals) : initializeGoals();
  } catch (error) {
    console.error('Error loading goals from localStorage:', error);
    return initializeGoals();
  }
};

// Save goals to localStorage
export const saveGoals = (goals) => {
  try {
    localStorage.setItem('goals', JSON.stringify(goals));
  } catch (error) {
    console.error('Error saving goals to localStorage:', error);
  }
};