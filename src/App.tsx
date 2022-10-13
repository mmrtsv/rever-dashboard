import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import ComingSoonAnimation from './Lottie/ComingSoon/ComingSoon';
import LogoWide from './assets/images/icons/logoWide.svg';

function App() {
  return (
    <div className='App'>
      <img src={LogoWide} alt='Rever Logo' />
      <ComingSoonAnimation />
      <h1>Coming soon...</h1>
    </div>
  );
}

export default App;
