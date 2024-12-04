import { Task } from '@/types/task';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTaskContext } from '@/contexts/TaskContext';

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
}

export function TaskCard({ task, index, onEdit }: TaskCardProps) {
  const { deleteTask } = useTaskContext();

  const priorityColors = {
    high: 'bg-priority-high text-white',
    medium: 'bg-priority-medium text-white',
    low: 'bg-priority-low text-white',
  };

  return (
    <Card
      className="p-4 mb-3 cursor-move hover:shadow-md transition-shadow duration-200 task-card"
      draggable="true"
      onDragStart={(e) => {
        e.dataTransfer.setData('taskId', task.id);
        e.dataTransfer.setData('sourceStatus', task.status);
        e.dataTransfer.setData('sourceIndex', index.toString());
        const card = e.currentTarget;
        card.classList.add('animate-task-drag', 'opacity-50');
      }}
      onDragEnd={(e) => {
        const card = e.currentTarget;
        card.classList.remove('animate-task-drag', 'opacity-50');
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <Badge className={priorityColors[task.priority]}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </Badge>
      </div>
      <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onEdit(task)}
          className="h-8 w-8"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => deleteTask(task.id)}
          className="h-8 w-8 text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}