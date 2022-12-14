import React from 'react';
import Footer from './components/common/footer/Footer';
import Menu from './components/common/menu/Menu';
import DiceRoller from './diceRoller/DiceRoller';
import './diceRoller/diceRoller.scss';
import vh from './components/common/functions/vh';

function App() {

  vh()
  window.onresize = vh;


  return (
    <div className="App" >
      <Menu />
      <DiceRoller />
      <Footer />
    </div>
  );
}

export default App;
