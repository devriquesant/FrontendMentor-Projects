import { useEffect, useState } from "react";
import CheckBoxInput from "./CheckBoxInput";
import { TodoFormProps } from "../modules/types";
import { ClassList } from '../modules/utils';

const classes = new ClassList();

const Placehold = {
  texts: [
    "What's on your mind?",
    "Jog around the park x3...",
    "Read for 1 hour...",
    "Pick up groceries...",
    "Drink some water...",
    "Fight with your brain...",
    "Stop drinking coffee...",
    "Go for a walk...",
    "Do some coding...",
    "Go to the gym...",
    "Drink some coffee...",
    "Finish the work...",
    "Plan the weekend...",
    "Create a new todo...",
    "Do some reading...",
    "Do some writing...",
    "Do some meditation...",
    "Go to yoga class...",
    "Stop procrastinating..."
  ],
  timer: -1,
  clearTimer(){ clearTimeout(this.timer); }
}

function getPlaceholder( index: number ){
  return Placehold.texts[index];
}

export default function TodoForm( props: TodoFormProps ){
  const { addItem, theme, filter } = props;
  const [value, setValue] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState( 0 );
  const [animationState, setAnimationState] = useState( 'static' );

  function handleChangeInput( event: React.ChangeEvent<HTMLInputElement> ){
    setValue( event.target.value );
  }

  function handleFormSubmit( event: React.FormEvent<HTMLFormElement> ){ 
    event.preventDefault();
    if ( value.trim() == '' ) return;

    addItem( value, filter == 'completed' );
    setValue( '' ); 
  }

  function animationTimer(){
    Placehold.timer = setInterval( () => {
      setAnimationState( 'leave' );
      setTimeout( () => {
        setAnimationState( 'enter' );
        setTimeout( () => {
          setAnimationState( 'static' );
          setPlaceholderIndex( ( placeholderIndex + 1 ) % Placehold.texts.length );
        }, 475 );
      }, 475 );
    }, 5000 );
  }

  function handleFocus( hasFocus: boolean ){
    if ( hasFocus ) Placehold.clearTimer();
    else{ 
      var v = value.trim();
      setValue( v );
      if ( v.length == 0 ) animationTimer();
    }
  }

  classes.set( 'send-btn', 'send-btn', value.length != 0 ? 'enabled' : '' );
  classes.set( 'submit', 'send-img', theme );
  classes.set( 'input', 'todo-input', animationState );

  useEffect( () => {
    animationTimer();

    return Placehold.clearTimer.bind( Placehold );    
  }, [placeholderIndex] );

  return (
    <form className="todo-form shadowing" onSubmit={handleFormSubmit}>
      <CheckBoxInput checkable={false}/>
      <input 
        value={value}
        type="text" 
        placeholder={getPlaceholder(placeholderIndex)} 
        className={classes.get('input')}
        onChange={handleChangeInput}
        onFocus={()=>handleFocus(true)}
        onBlur={()=>handleFocus(false)}
        
      />
      <div className="container-wrapper">
        <button className={classes.get('send-btn')}>
          <img src="./images/icon-send.svg" className={classes.get('submit')}/>
        </button>
      </div>
    </form>
  )
}