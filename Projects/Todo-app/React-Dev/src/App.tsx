import './css/App.css';
import TodoWrapper from './components/TodoWrapper';

export default function App() {
  return (
    <>
      <header>
        <img className="background dark" src="./images/bg-desktop-dark.jpg"/>
        <img className="background light" src="./images/bg-desktop-light.jpg"/>
      </header>
      <main className="App">
        <TodoWrapper/>
      </main>
    </>
  )
}