import React, { useRef,  } from 'react';
import { useDragLayer } from 'react-dnd';

import { ListItem } from './ListItem';

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 1000,
    left: 0,
    top: 0,
}

function getItemStyles(initialOffset, currentOffset, dragProps) {
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        }
    }

    const {x, y} = currentOffset;

    const {height, width} = dragProps;

    return {
        ...layerStyles,
        top: y,
        left: x,
        width: `${width}px`,
        height: `${height}px`,
        transform: 'rotate(2deg)',
    }
}

export const ListDragLayer = () => {
    const dragProps = useRef(null);

    const {
        itemType,
        isDragging,
        item,
        initialOffset,
        currentOffset,
    } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }));

    if (!isDragging) {
        return null
    }

    const getBoundingClientRect =  item.ref.current?.getBoundingClientRect();
    if (getBoundingClientRect) {
        dragProps.current = getBoundingClientRect;
    }

    return itemType === 'listItem'
        ? (
            <ListItem text={item.text} style={getItemStyles(initialOffset, currentOffset, dragProps.current)} />
        )
        : null;
}
