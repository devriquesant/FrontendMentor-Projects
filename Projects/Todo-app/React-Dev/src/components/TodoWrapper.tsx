import TodoForm from './TodoForm';
import TodoList from './TodoList';
import ThemeSwitcher from './ThemeSwitcher';
import { useState } from 'react';
import ThemeHandler from '../modules/themeHandler';
import { TodoObject } from '../modules/utils';
import TodosHandler from '../modules/todosHandler';

function changeVariableThemes( value: string ){
  ThemeHandler.setTheme( value );
  document.documentElement.dataset.theme = value;
}

function setTodoByFilter( filterName: string, setTodos: Function ){
  switch( filterName ){
    case 'all':
      setTodos( TodosHandler.getTodos() );
      break;
    case 'completed':
      setTodos( TodosHandler.getCompletedTodos() );
      break;
    case 'active':
      setTodos( TodosHandler.getActiveTodos() );
      break;
  }
}

export default function TodoWrapper(){
  const [theme, setTheme] = useState( ThemeHandler.getTheme() );
  const [todos, setTodos] = useState<TodoObject[]>( TodosHandler.getTodos() );
  const [filter, setFilter] = useState( 'all' );
  changeVariableThemes( theme );
  // updateTodos( todos, filter );

  function changeToTheme( value: string ){
    changeVariableThemes( value );
    setTheme( value );
  }

  function addTodoItem( task: string, check: boolean = false ){
    TodosHandler.addTodo( new TodoObject( task, check ) );
    setTodoByFilter( filter, setTodos );
  }

  function checkTodoItem( id: string ){
    TodosHandler.checkTodo( id );
    setTodoByFilter( filter, setTodos );
  }

  function deleteTodoItem( id: string ){
    TodosHandler.deleteTodo( id );
    setTodoByFilter( filter, setTodos );
  }

  function sortTodos( todos: Array<TodoObject> ){
    if ( filter == 'all' ) TodosHandler.setTodos( todos );
    setTodos( todos );
  }

  function filterTodos( filterName: string ){
    setTodoByFilter( filterName, setTodos );
    setFilter( filterName );
  }

  function clearCompleted( items: Array<TodoObject> ){
    setTodos( items );
  }

  const actions = {deleteTodoItem, checkTodoItem, sortTodos, filterTodos, clearCompleted};
  
  return (
    <section className="wrapper">
      <div className="header">
        <h1>TODO</h1>
        <ThemeSwitcher changeTheme={changeToTheme}/>
      </div>
      <div className="app-content">
        <TodoForm addItem={addTodoItem} theme={theme} filter={filter} />
        <TodoList todos={todos} actions={actions}/>        
      </div>
      <span className="info-text">Drag & Drop to reorder list</span>
    </section>
  );
}