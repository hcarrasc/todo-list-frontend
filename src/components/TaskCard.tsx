import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../types/task';

interface TaskCardProps {
    task: Task;
}

function TaskCard({ task }: TaskCardProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <article
            ref={setNodeRef}
            style={style}
            className="task-card"
            {...listeners}
            {...attributes}
        >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
        </article>
    );
}

export default TaskCard;
