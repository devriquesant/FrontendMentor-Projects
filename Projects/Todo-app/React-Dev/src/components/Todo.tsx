import CheckBoxInput from "./CheckBoxInput";
import { TodoProps } from "../modules/types";
import { ClassList } from "../main";
import React, { useState, useEffect } from "react";

const classes = new ClassList();

export default function Todo( props: TodoProps ){
  const [eventAnimation, setEventAnimation] = useState('static');
  const { dragProvided, dragActive } = props;
  const { id, task, completed, isEditing, isDeleting } = props.value;
  const { deleteTodoItem, checkTodoItem } = props.actions;

  function handleDeleteItem( ){
    setEventAnimation( 'delete-item' );
    setTimeout( () => { deleteTodoItem( id ); }, 475 );
  }

  function handleCheckItem(){
    checkTodoItem( id );
  }

  classes.set( 'todo-item', 'todo-item', eventAnimation, dragActive ? 'dragging-item' : '' );
  classes.set( 'label', completed ? 'completed' : '' );
  classes.set( 'stroke', 'stroke', completed ? 'completed' : '' );

  useEffect( () => {
    if ( isDeleting ) handleDeleteItem();
  })
  
  return (
    <li className={classes.get('todo-item')}
      {...dragProvided.dragHandleProps}
      {...dragProvided.draggableProps}
      ref={dragProvided.innerRef}
    >
      <div className="grabber">
        <img src="./images/icon-grab.svg"/>
      </div>
      <CheckBoxInput isChecked={completed} checkable={true} onCheck={handleCheckItem}/>
      <label className={classes.get('label')}>{task}</label>
      <span className={classes.get('stroke')}></span>
      <div className="container-wrapper">
        <button className="close-btn" onClick={handleDeleteItem}>
          <img src="./images/icon-cross.svg"/>
        </button>
      </div>
    </li>
  );
}