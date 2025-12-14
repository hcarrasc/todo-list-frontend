import { useDroppable } from '@dnd-kit/core';

interface ColumnProps {
    id: string;
    children?: React.ReactNode;
}

function ColumnTrash({ id, children }: ColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            className="column-trash"
            style={{
                backgroundColor: isOver ? '#f3a1a1ff' : '#dfd0d0ff',
            }}
        >
            {children}
        </div>
    );
}

export default ColumnTrash;
