import React, { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';

const itemStyle = {
    display: 'flex',
    height: '100px',
    backgroundColor: 'red',
    border: '1px solid black',
    padding: '10px 5px',
}

const placeHolderStyle = {
    height: '100px',
    border: '2px dashed red',
    padding: '10px 5px',
}

const handleStyle = {
  backgroundColor: 'green',
  width: '3rem',
  height: '100%',
  display: 'inline-block',
  marginRight: '0.75rem',
  cursor: 'move',
}

export const ListItem = ({
    id,
    text,
    index,
    moveCard = () => {},
    findCard = () => {},
    style = {},
}) => {
    const ref = useRef(null);
    const originalIndex = findCard(id)?.index;

    const [{ isDragging }, drag] = useDrag({
        item: { type: 'listItem', id, text, index, ref, originalIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (dropResult, monitor) => {
            const { id: droppedId, originalIndex } = monitor.getItem();
            const didDrop = monitor.didDrop();
            if (!didDrop) {
                moveCard(droppedId, originalIndex);
            }
        },
    });

    const [, drop] = useDrop({
        accept: 'listItem',
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });


    drop(ref);

    return !isDragging ? (
        <li
            ref={ref}
            style={{ ...itemStyle, ...style }}
        >
            <div ref={drag} style={handleStyle} />
            {text}
        </li>
    ) : <li style={placeHolderStyle} />
}
