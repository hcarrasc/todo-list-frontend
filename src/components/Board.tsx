import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { useState } from 'react';
import Column from './Column';
import TaskCard from './TaskCard';
import type { Task, Status } from '../types/task';
import ColumnTrash from './ColumnTrash';

const columns: { id: Status; title: string }[] = [
    { id: 'todo', title: 'To do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'review', title: 'Review' },
    { id: 'done', title: 'Done' },
];

function Board() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim()) return;
        const newTask: Task = {
            id: crypto.randomUUID(),
            title: title,
            description: description,
            status: 'todo',
        };
        setTasks((prev) => [...prev, newTask]);
        setTitle('');
        setDescription('');
    };

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
            <section className="inbox">
                <div className="column">
                    <h2>NEW TASK</h2>
                    <form className="task-card" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button type="submit">Add</button>
                    </form>
                    <h2>TRASH</h2>
                    <ColumnTrash key="trash" id="trash"></ColumnTrash>
                </div>
            </section>
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
