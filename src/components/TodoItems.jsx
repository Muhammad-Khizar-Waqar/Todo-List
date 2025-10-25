import { motion } from 'framer-motion';
import { Checkbox } from './ui/Checkbox';
import { Calendar, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

const priorityColors = {
  low: 'bg-blue-100 text-blue-800 border-blue-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-red-100 text-red-800 border-red-200',
};

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
          className="mt-1"
        />

        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onEdit(todo)}>
          <div className="flex items-center gap-2 mb-1">
            <h3
              className={`font-medium text-gray-900 ${todo.completed ? 'line-through text-gray-500' : ''
                }`}
            >
              {todo.title}
            </h3>
            <Badge
              variant="outline"
              className={`text-xs ${priorityColors[todo.priority]}`}
            >
              {todo.priority}
            </Badge>
          </div>

          {todo.description && (
            <p
              className={`text-sm text-gray-600 mb-2 ${todo.completed ? 'line-through text-gray-400' : ''
                }`}
            >
              {todo.description}
            </p>
          )}

          {todo.dueDate && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{format(new Date(todo.dueDate), 'MMM dd, yyyy')}</span>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(todo.id)}
          className="text-gray-400 hover:text-red-600 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}