import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { useState } from 'react';
import Column from './Column';
import TaskCard from './TaskCard';
import type { Task, Status } from '../types/task';

const initialTasks: Task[] = [
    {
        id: '1',
        title: 'Task 1',
        description: 'This is the first task.',
        status: 'todo',
    },
];

const columns: { id: Status; title: string }[] = [
    { id: 'todo', title: 'To do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'review', title: 'Review' },
    { id: 'done', title: 'Done' },
];

function Board() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const taskId = active.id as string;
        const newStatus = over.id as Status;

        setTasks((prev) =>
            prev.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)),
        );
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <section className="board">
                {columns.map((column) => (
                    <Column key={column.id} id={column.id} title={column.title}>
                        {tasks
                            .filter((task) => task.status === column.id)
                            .map((task) => (
                                <TaskCard key={task.id} task={task} />
                            ))}
                    </Column>
                ))}
            </section>
        </DndContext>
    );
}

export default Board;
