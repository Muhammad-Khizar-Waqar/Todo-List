const STORAGE_KEY = 'todos-app-data';

export const loadTodos = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading todos:', error);
    return [];
  }
};

export const saveTodos = (todos) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos:', error);
  }
};

export const filterAndSortTodos = (todos, filters) => {
  let filtered = [...todos];

  // Filter by status
  if (filters.status === 'active') {
    filtered = filtered.filter(todo => !todo.completed);
  } else if (filters.status === 'completed') {
    filtered = filtered.filter(todo => todo.completed);
  }

  // Filter by search query
  if (filters.searchQuery.trim()) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(todo =>
      todo.title.toLowerCase().includes(query) ||
      todo.description.toLowerCase().includes(query)
    );
  }

  // Sort
  filtered.sort((a, b) => {
    switch (filters.sortBy) {
      case 'date-asc':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'date-desc':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'priority': {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return filtered;
};
