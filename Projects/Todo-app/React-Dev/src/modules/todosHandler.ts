import { TodoObject } from "./utils";

const parse = JSON.parse.bind( JSON );
const stringify = JSON.stringify.bind( JSON );

export default class TodosHandler{
  static getTodos(): TodoObject[] {
    var todos = localStorage.getItem( 'todos' );
    if ( !todos ) { todos = TodosHandler.setTodos( [] ) };
    return parse(todos);
  }

  static setTodos( value: TodoObject[] ): string {
    localStorage.setItem( 'todos', stringify( value ) );
    return stringify(value);
  }

  static getCompletedTodos(){
    var todos = TodosHandler.getTodos();
    return todos.filter( todo => todo.completed );
  }

  static getActiveTodos(){
    var todos = TodosHandler.getTodos();
    return todos.filter( todo => !todo.completed );
  }

  static addTodo( todo: TodoObject ){
    var todos = TodosHandler.getTodos();
    todos.push( todo );
    TodosHandler.setTodos( todos );
  }

  static checkTodo( id: string ){
    var todos = TodosHandler.getTodos()
    .map( todo => {
      if ( todo.id == id ) todo.completed = !todo.completed;
      return todo;
    } )
    TodosHandler.setTodos( todos );
  }

  static deleteTodo( id: string ){
    var todos = TodosHandler.getTodos()
    .filter( todo => todo.id !== id )
    TodosHandler.setTodos( todos );
  }
}