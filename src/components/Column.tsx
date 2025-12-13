import { useDroppable } from '@dnd-kit/core';

interface ColumnProps {
    id: string;
    title: string;
    children: React.ReactNode;
}

function Column({ id, title, children }: ColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            className="column"
            style={{
                backgroundColor: isOver ? '#eaeaea' : 'transparent',
            }}
        >
            <h2>{title}</h2>
            {children}
        </div>
    );
}

export default Column;
