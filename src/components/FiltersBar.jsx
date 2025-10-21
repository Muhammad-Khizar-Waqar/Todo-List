import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Search, SortAsc } from 'lucide-react';

export default function FiltersBar({
  status,
  searchQuery,
  sortBy,
  onStatusChange,
  onSearchChange,
  onSortChange,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search todos..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label className="text-xs font-medium text-gray-700 mb-1 block">
            Status
          </label>
          <div className="flex gap-2">
            <Button
              variant={status === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onStatusChange('all')}
              className="flex-1"
            >
              All
            </Button>
            <Button
              variant={status === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onStatusChange('active')}
              className="flex-1"
            >
              Active
            </Button>
            <Button
              variant={status === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onStatusChange('completed')}
              className="flex-1"
            >
              Completed
            </Button>
          </div>
        </div>

        <div className="sm:w-48">
          <label className="text-xs font-medium text-gray-700 mb-1 block">
            Sort By
          </label>
          <Select value={sortBy} onValueChange={(value) => onSortChange(value)}>
            <SelectTrigger>
              <SortAsc className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Newest First</SelectItem>
              <SelectItem value="date-asc">Oldest First</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="title">Title (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
