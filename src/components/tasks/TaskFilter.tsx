import React from 'react';
import type { TaskFilter } from '../../types';
import { TASK_FILTERS } from '../../utils/constants';

interface TaskFilterProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  taskCounts: {
    all: number;
    completed: number;
    pending: number;
  };
}

export const TaskFilterComponent: React.FC<TaskFilterProps> = ({
  currentFilter,
  onFilterChange,
  taskCounts,
}) => {
  const filters = [
    { key: TASK_FILTERS.ALL as TaskFilter, label: 'Todas', count: taskCounts.all },
    { key: TASK_FILTERS.PENDING as TaskFilter, label: 'Pendientes', count: taskCounts.pending },
    { key: TASK_FILTERS.COMPLETED as TaskFilter, label: 'Completadas', count: taskCounts.completed },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map(({ key, label, count }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors font-sans border
            ${currentFilter === key
              ? 'bg-primary text-white border-primary shadow'
              : 'bg-white text-[#D92B4B] border-primary hover:bg-[#F2BD1D]/20 hover:text-[#73462D]'}
          `}
        >
          {label} ({count})
        </button>
      ))}
    </div>
  );
};
