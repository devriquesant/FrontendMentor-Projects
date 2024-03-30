import { useState } from 'react';
import ThemeHandler from '../modules/themeHandler';
import { ClassList } from '../modules/utils';

const classes = new ClassList();

interface ThemeSwitcherProps {
  changeTheme: Function;
}

export default function ThemeSwitcher( props: ThemeSwitcherProps ){
  const { changeTheme } = props;
  const [open, setOpen] = useState( false );
  const themes = [
    {value: 'dark', src: './images/icon-moon.svg', title: "Dark Theme"},
    {value: 'light', src: './images/icon-sun.svg', title: "Light Theme"},
    {value: 'auto', src: './images/icon-auto.svg', title: "System Theme (Default)"}
  ];
  const { currentTheme, otherThemes } = generateThemeComponents();
  const themeClasses = ['theme-container', open ? 'open' : ''];

  function generateThemeComponents() {
    var currentTheme: Array<JSX.Element> = [];
    var otherThemes: Array<JSX.Element> = [];
    
    for ( var i = 0; i < themes.length; i++ ){
      const currTheme = themes[i].value;
      
      if ( themes[i].value == ThemeHandler.getTheme() ){
        currentTheme.push( 
          <button key={i} onClick={toogleSwitcherMenu}>
            <img src={themes[i].src} alt={themes[i].title} title={themes[i].title} />
          </button>
        )
      }else{
        otherThemes.push( 
          <button key={i} onClick={()=>changeTheme(currTheme)}>
            <img src={themes[i].src}  alt={themes[i].title} title={themes[i].title} />
          </button>
        )
      }
    }

    return {currentTheme, otherThemes};
  }

  function toogleSwitcherMenu(){ setOpen( !open ); }

  classes.set('current', ...themeClasses, 'current-theme');
  classes.set('other', ...themeClasses, 'other-themes');
  
  return (
    <div className="theme-switcher">
      <div className={classes.get('current')}>{currentTheme}</div>
      <div className={classes.get('other')}>{otherThemes}</div>
    </div>
  );
}