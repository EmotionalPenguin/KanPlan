import React, { createContext, useContext, useState } from 'react';
import { Task, Status } from '@/types/task';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: Status) => void;
  reorderTask: (taskId: string, sourceIndex: number, destinationIndex: number, status: Status) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const moveTask = (taskId: string, newStatus: Status) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const reorderTask = (taskId: string, sourceIndex: number, destinationIndex: number, status: Status) => {
    setTasks((prev) => {
      const result = [...prev];
      const statusTasks = result.filter(task => task.status === status);
      const [reorderedTask] = statusTasks.splice(sourceIndex, 1);
      statusTasks.splice(destinationIndex, 0, reorderedTask);
      
      // Reconstruct the full task list with the reordered tasks
      return [
        ...result.filter(task => task.status !== status),
        ...statusTasks
      ];
    });
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, moveTask, reorderTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}