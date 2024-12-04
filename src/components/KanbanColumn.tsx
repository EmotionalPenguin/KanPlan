import { Status, Task } from '@/types/task';
import { TaskCard } from './TaskCard';
import { useTaskContext } from '@/contexts/TaskContext';

interface KanbanColumnProps {
  title: string;
  status: Status;
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

export function KanbanColumn({ title, status, tasks, onEditTask }: KanbanColumnProps) {
  const { moveTask, reorderTask } = useTaskContext();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const column = e.currentTarget;
    column.classList.add('bg-accent/50');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    const column = e.currentTarget;
    column.classList.remove('bg-accent/50');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const column = e.currentTarget as HTMLElement;
    column.classList.remove('bg-accent/50');
    
    const taskId = e.dataTransfer.getData('taskId');
    const sourceStatus = e.dataTransfer.getData('sourceStatus');
    const sourceIndex = parseInt(e.dataTransfer.getData('sourceIndex'));
    
    if (sourceStatus !== status) {
      // Moving between columns
      moveTask(taskId, status);
    } else {
      // Reordering within the same column
      const dropIndex = getDropIndex(e.clientY, column);
      if (dropIndex !== sourceIndex) {
        reorderTask(taskId, sourceIndex, dropIndex, status);
      }
    }
  };

  const getDropIndex = (y: number, column: HTMLElement): number => {
    const taskElements = Array.from(column.getElementsByClassName('task-card'));
    const closestTask = taskElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY, element: null });

    if (closestTask.element === null) {
      return taskElements.length;
    }

    return taskElements.indexOf(closestTask.element);
  };

  return (
    <div
      className="flex-1 min-w-[300px] bg-muted/50 rounded-lg p-4"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h2 className="font-semibold text-xl mb-4">{title}</h2>
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            index={index}
            onEdit={onEditTask} 
          />
        ))}
      </div>
    </div>
  );
}