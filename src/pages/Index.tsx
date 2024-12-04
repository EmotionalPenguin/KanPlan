import { useState } from 'react';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { KanbanColumn } from '@/components/KanbanColumn';
import { TaskDialog } from '@/components/TaskDialog';
import { TaskProvider, useTaskContext } from '@/contexts/TaskContext';

function KanbanBoard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const { tasks } = useTaskContext();

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setEditingTask(undefined);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">KanPlan</h1>
          <Button onClick={() => setDialogOpen(true)} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4">
          <KanbanColumn
            title="To Do"
            status="todo"
            tasks={tasks.filter((task) => task.status === 'todo')}
            onEditTask={handleEditTask}
          />
          <KanbanColumn
            title="In Progress"
            status="ongoing"
            tasks={tasks.filter((task) => task.status === 'ongoing')}
            onEditTask={handleEditTask}
          />
          <KanbanColumn
            title="Completed"
            status="completed"
            tasks={tasks.filter((task) => task.status === 'completed')}
            onEditTask={handleEditTask}
          />
        </div>

        <TaskDialog
          open={dialogOpen}
          onOpenChange={handleDialogOpenChange}
          editingTask={editingTask}
        />
      </div>
    </div>
  );
}

const Index = () => {
  return (
    <TaskProvider>
      <KanbanBoard />
    </TaskProvider>
  );
};

export default Index;