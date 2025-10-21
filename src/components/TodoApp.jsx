import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Plus, CheckCircle2 } from 'lucide-react';
import TodoList from './TodoList';
import FiltersBar from './FiltersBar';
import EditTodoModal from './EditTodoModal';
import { loadTodos, saveTodos, filterAndSortTodos } from '../lib/todoUtils';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    searchQuery: '',
    sortBy: 'date-desc',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  // Load todos from localStorage on mount
  useEffect(() => {
    const loaded = loadTodos();
    setTodos(loaded);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (todos.length > 0 || loadTodos().length > 0) {
      saveTodos(todos);
    }
  }, [todos]);

  const handleCreateTodo = (todoData) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title: todoData.title,
      description: todoData.description || '',
      completed: false,
      dueDate: todoData.dueDate || null,
      priority: todoData.priority || 'medium',
      createdAt: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
  };

  const handleUpdateTodo = (todoData) => {
    if (!editingTodo) return;
    setTodos(
      todos.map((todo) =>
        todo.id === editingTodo.id ? { ...todo, ...todoData } : todo
      )
    );
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditClick = (todo) => {
    setEditingTodo(todo);
    setModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingTodo(null);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingTodo(null);
  };

  const filteredTodos = filterAndSortTodos(todos, filters);
  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">My Todos</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  {completedCount} completed
                </span>
                <span>•</span>
                <span>{activeCount} active</span>
              </div>
            </div>
            <Button
              onClick={handleAddClick}
              size="lg"
              className="shadow-lg hover:shadow-xl transition-shadow"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Todo
            </Button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <FiltersBar
            status={filters.status}
            searchQuery={filters.searchQuery}
            sortBy={filters.sortBy}
            onStatusChange={(status) =>
              setFilters({ ...filters, status })
            }
            onSearchChange={(searchQuery) =>
              setFilters({ ...filters, searchQuery })
            }
            onSortChange={(sortBy) =>
              setFilters({ ...filters, sortBy })
            }
          />
        </motion.div>

        {/* Todo List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <TodoList
            todos={filteredTodos}
            onToggle={handleToggleTodo}
            onEdit={handleEditClick}
            onDelete={handleDeleteTodo}
          />
        </motion.div>

        {/* Edit/Create Modal */}
        <EditTodoModal
          open={modalOpen}
          onOpenChange={handleModalClose}
          todo={editingTodo}
          onSave={editingTodo ? handleUpdateTodo : handleCreateTodo}
        />
      </div>
    </div>
  );
}
