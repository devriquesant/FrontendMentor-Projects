import { TodoListProps } from '../modules/types';
import Todo from './Todo';
import { ClassList } from '../modules/utils';
import {DragDropContext, Draggable, DraggableProvided, Droppable, DroppableProvided, DropResult, DragStart} from 'react-beautiful-dnd';
import React, { useState } from 'react';

const classes = new ClassList();

export default function TodoList( props: TodoListProps ){
  const [ dragId, setDragId ] = useState( '' );
  const { todos, actions } = props;

  function handleDragEnd( results: DropResult ){
    const { source, destination } = results;
    setDragId( '' );
    
    if ( !destination ) return;
    if ( destination.droppableId == source.droppableId && destination.index == source.index ) return;

    const newTodos = todos.concat();
    const draggedItem = newTodos.splice( source.index, 1 );
    newTodos.splice( destination.index, 0, draggedItem[0] );

    actions.sortTodos( newTodos );
  }

  function handleDragStart( results: DragStart ){
    setDragId( results.draggableId );
  }

  function handleFilterInput( event: React.ChangeEvent<HTMLInputElement> ){
    const filter = event.target.value;
    actions.filterTodos( filter );
  }

  function handleClearCompleted(){
    actions.clearCompleted(
      todos.map( todo => {
        if ( todo.completed ) { todo.isDeleting = true; }
        return todo;
      } )
    )
  }

  classes.set( 'todos', 'todos', todos.length == 0 ? 'no-items' : '' );

  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="todo-list shadowing">
        <Droppable droppableId="TODOS" type="group">
          {(dropProvided: DroppableProvided) => (
            <ul 
              className={classes.get('todos')}
              ref={dropProvided.innerRef}
              {...dropProvided.droppableProps}
            >
              {todos.map( (todo, index) => {
                return (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(dragProvided: DraggableProvided) => {
                      return (
                        <Todo 
                          key={todo.id} 
                          value={todo} 
                          actions={actions} 
                          dragProvided={dragProvided} 
                          dragActive={ dragProvided.draggableProps['data-rbd-draggable-id'] == dragId }
                        />
                      )
                    }}
                  </Draggable>
                )
              })}
              {dropProvided.placeholder}
            </ul>
          )}
        </Droppable>

        <div className="settings">
          <p>{todos.filter(todo=>!todo.completed).length} items left</p>
          <ul className="filters">
            <li><input type="radio" defaultChecked={true} value="all" name="filter" onChange={handleFilterInput}/></li>
            <li><input type="radio" value="completed" name="filter" onChange={handleFilterInput}/></li>
            <li><input type="radio" value="active" name="filter" onChange={handleFilterInput}/></li>
          </ul>
          <button className="clear-btn" onClick={handleClearCompleted}>Clear completed</button>
        </div>
      </div>
    </DragDropContext>
  )
}