import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { List } from './List';
import { ListDragLayer } from './ListDragLayer';
import './App.css';

function App() {
    console.log('APP', 'render');
    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <List/>
                <ListDragLayer/>
            </DndProvider>
        </div>
    );
}

export default App;
