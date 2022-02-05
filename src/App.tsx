import React from 'react';
import './App.css';
import Board from './components/Board';
import Calendar from './components/Calendar';
import Header from './components/Ui/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Calendar />
      <Board />
    </div>
  );
}

export default App;
