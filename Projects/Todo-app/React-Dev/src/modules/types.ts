import { TodoObject } from "./utils";
import { DraggableProvided } from 'react-beautiful-dnd';

type ItemActions = {
  deleteTodoItem: ( id: string ) => void;
  checkTodoItem: ( id: string ) => void;
  sortTodos: ( items: Array<TodoObject> ) => void;
  filterTodos: ( filterName: string ) => void;
  clearCompleted: ( items: Array<TodoObject> ) => void;
}

export interface TodoListProps {
  todos: Array<TodoObject>;
  actions: ItemActions;
}
export interface TodoFormProps {
  addItem: Function;
  theme: string;
  filter: string;
}

export interface TodoProps {
  value: TodoObject;
  actions: ItemActions;
  dragProvided: DraggableProvided;
  dragActive: boolean;
}

export interface CheckBoxInputProps {
  checkable: boolean;
  onCheck?: Function;
  isChecked?: boolean;
}