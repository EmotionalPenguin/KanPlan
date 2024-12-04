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
  const { moveTask } = useTaskContext();

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
    const column = e.currentTarget;
    column.classList.remove('bg-accent/50');
    
    const taskId = e.dataTransfer.getData('taskId');
    moveTask(taskId, status);
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
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEditTask} />
        ))}
      </div>
    </div>
  );
}