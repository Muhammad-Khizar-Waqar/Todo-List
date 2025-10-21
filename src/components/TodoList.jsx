import { AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItems';

export default function TodoList({ todos, onToggle, onEdit, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">No todos found</div>
        <p className="text-gray-500 text-sm">Create a new todo to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
