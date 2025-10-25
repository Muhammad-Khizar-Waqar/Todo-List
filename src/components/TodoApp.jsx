import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { Plus, CheckCircle2 } from 'lucide-react';
import TodoList from './TodoList';
import FiltersBar from './FiltersBar';
import EditTodoModal from './EditTodoModal';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, updateTodo, toggleTodo, setStatus, setSearchQuery, setSortBy } from '../store/slices/todo.slice';

export default function TodoApp() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const filters = useSelector((state) => state.todo.filters);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

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
    dispatch(addTodo(newTodo));
  };

  const handleUpdateTodo = (todoData) => {
    if (!editingTodo) return;
    dispatch(updateTodo({ id: editingTodo.id, changes: todoData }));
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(removeTodo(id));
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

  const filteredTodos = useMemo(() => {
    let list = [...todos];
    if (filters.status === 'active') {
      list = list.filter((t) => !t.completed);
    } else if (filters.status === 'completed') {
      list = list.filter((t) => t.completed);
    }
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description || '').toLowerCase().includes(q)
      );
    }
    switch (filters.sortBy) {
      case 'date-asc':
        list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'priority': {
        const order = { high: 0, medium: 1, low: 2 };
        list.sort((a, b) => order[a.priority] - order[b.priority]);
        break;
      }
      case 'title':
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'date-desc':
      default:
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return list;
  }, [todos, filters]);
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
            onStatusChange={(status) => dispatch(setStatus(status))}
            onSearchChange={(q) => dispatch(setSearchQuery(q))}
            onSortChange={(sort) => dispatch(setSortBy(sort))}
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