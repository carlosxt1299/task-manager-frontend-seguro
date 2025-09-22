import React, { useEffect, useState, useMemo } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { TaskList } from '../components/tasks/TaskList';
import { TaskForm } from '../components/tasks/TaskForm';
import { TaskFilterComponent } from '../components/tasks/TaskFilter';
import { Button } from '../components/ui/Button';
import { useTasks } from '../hooks/useTasks';
import type { Task, TaskFormData } from '../types';

export const TasksPage: React.FC = () => {
  const {
    tasks,
    filter,
    setFilter,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    fetchTasks,
    isLoading,
  } = useTasks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Calculate task counts for filters
  const taskCounts = useMemo(() => {
    const completed = tasks.filter(task => task.done).length;
    const pending = tasks.filter(task => !task.done).length;
    
    return {
      all: tasks.length,
      completed,
      pending,
    };
  }, [tasks]);

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleSubmitTask = async (data: TaskFormData) => {
    if (editingTask) {
      await updateTask(editingTask.id, data);
    } else {
      await createTask(data);
    }
  };

  const handleToggleTask = async (id: string) => {
    await toggleTask(id);
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
  };

  return (
    <div className="min-h-screen bg-[#91E0F2]/30 flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-1 font-sans">Mis Tareas</h1>
                <p className="mt-2 text-[#73462D] font-medium font-sans">Gestiona tus tareas de manera eficiente</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Button onClick={handleCreateTask} className="bg-warning text-white hover:bg-warning/90 font-sans">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Nueva Tarea
                </Button>
              </div>
            </div>
          </div>

          {/* Task filters */}
          <TaskFilterComponent
            currentFilter={filter}
            onFilterChange={setFilter}
            taskCounts={taskCounts}
          />

          {/* Task list */}
          <TaskList
            tasks={tasks}
            filter={filter}
            onToggleTask={handleToggleTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            isLoading={isLoading}
          />
        </div>
      </main>
      <Footer />
      {/* Task form modal */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitTask}
        task={editingTask}
        isLoading={isLoading}
      />
    </div>
  );
};
