import React, { useCallback, useState } from 'react';
import update from 'immutability-helper';
import { ListItem } from './ListItem';

const style = {
    position: 'relative',
    backgroundColor: 'white',
    width: '50vw',
    listStyle: 'none',
    padding: 0,
    margin: 0,
}

const ITEMS = [
    {
        id: 1,
        text: 'Write a cool JS library',
    },
    {
        id: 2,
        text: 'Make it generic enough',
    },
    {
        id: 3,
        text: 'Write README',
    },
    {
        id: 4,
        text: 'Create some examples',
    },
    {
        id: 5,
        text: 'Spam in Twitter and IRC to promote it',
    },
    {
        id: 6,
        text: '???',
    },
    {
        id: 7,
        text: 'PROFIT',
    },
];

export const List = () => {
    const [cards, setCards] = useState(ITEMS);

    const moveCard = useCallback(
            (dragIndex, hoverIndex) => {
                const dragCard = cards[dragIndex]
                setCards(
                    update(cards, {
                        $splice: [
                            [dragIndex, 1],
                            [hoverIndex, 0, dragCard],
                        ],
                    }),
                )
        },
        [cards],
    )

    return (
        <ul
            style={style}
        >
            {cards.map((card, index) => (
                <ListItem
                    key={card.id}
                    index={index}
                    id={`${card.id}`}
                    text={card.text}
                    moveCard={moveCard}
                />
            ))}
        </ul>
    )
}
