import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Employee from './Pages/Employee';

function App() {
  return (
    <div className="App">
      <Employee />
    </div>
  );
}

export default App;
