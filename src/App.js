import './App.css';
import logo from './homeImage340.png';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import Plants from './pages/Plants';
import Seedlings from './pages/Seedlings';
import Growths from './pages/Growths';
import Productions from './pages/Productions';
import Fertilizers from './pages/Fertilizers';
import GrowingLocations from './pages/GrowingLocations';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GermSquad</h1>
        <img src={logo} alt="logo" className="logo" />
        <p>Track your plants from germination to harvest!</p>
      </header>
      <div className="App-main">
        <Router>
          <Navigation />
          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/Plants' element={<Plants />}></Route>
            <Route path='/Seedlings' element={<Seedlings />}></Route>
            <Route path='/Growths' element={<Growths />}></Route>
            <Route path='/Productions' element={<Productions />}></Route>
            <Route path='/Fertilizers' element={<Fertilizers />}></Route>
            <Route path='/GrowingLocations' element={<GrowingLocations />}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;