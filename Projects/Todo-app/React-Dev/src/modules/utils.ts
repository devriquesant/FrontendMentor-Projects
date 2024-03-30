type classListType = { [key: string]: Array<string> }
export class ClassList{
  classList: classListType = {};

  get( key: string ): string { return this.classList[key].join(' '); }
  set( key: string, ...values: Array<string> ){ this.classList[key] = values; }
  add( key: string, ...values: Array<string> ){ this.classList[key].push( ...values ); }
  remove( key: string, ...values: Array<string> ){
    this.classList[key] = this.classList[key].filter( value => !values.includes( value ) );
  }
  replace( key: string, value1: string, value2: string ){
    this.classList[key] = this.classList[key].map( value => value === value1 ? value2 : value );
  }
}

function uuid(){
  var time = new Date().getTime();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c){
    var r = (time + Math.random()*16)%16 | 0;
    time = Math.floor(time/16);
    return (c == "x" ? r : (r&0x3|0x8)).toString(16);
  } )
}

export class TodoObject {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
  isDeleting: boolean;
  constructor( task: string, completed: boolean = false ){
    this.id = uuid();
    this.task = task;
    this.completed = completed;
    this.isEditing = false;
    this.isDeleting = false;
  }
}