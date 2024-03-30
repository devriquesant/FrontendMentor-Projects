import { ClassList } from "../modules/utils";
import { CheckBoxInputProps } from '../modules/types';

const classes = new ClassList();

export default function CheckBoxInput( props: CheckBoxInputProps ){
  const { checkable, onCheck, isChecked } = props;

  function handleChange( event: React.ChangeEvent<HTMLInputElement> ){
    onCheck ? onCheck( event ) : null;
  }
  
  classes.set('check-box', checkable ? 'checkable' : '', 'todo-check');
  
  return (
    <div className="container-wrapper">
      <input defaultChecked={isChecked} 
        className={classes.get('check-box')}
        type="checkbox"
        onChange={handleChange}
      />
    </div>
  )
}