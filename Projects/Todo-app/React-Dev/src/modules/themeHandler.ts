export default class ThemeHandler{
  static getTheme(): string {
    return localStorage.getItem( 'theme' ) ? localStorage.getItem( 'theme' ) as string : ThemeHandler.setTheme( 'light' );
  }

  static setTheme( value: string ): string { 
    localStorage.setItem( 'theme', value );
    return value;
  }
}
