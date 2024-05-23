// 5/07/2024
// Utilized create-react-app to provide the structure of the project :
// https://create-react-app.dev

import './App.css';
import logo from './homeImage340.png';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Plants from './pages/Plants';
import Seedlings from './pages/Seedlings';
import Growths from './pages/Growths';
import Productions from './pages/Productions';
import Fertilizers from './pages/Fertilizers';
import GrowingLocations from './pages/GrowingLocations';
import HomePage from './pages/HomePage';
import FertilizerDetails from './pages/FertilizerDetails'
import LocationDetails from './pages/LocationDetails'

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
            <Route path='/FertilizerDetails' element={<FertilizerDetails />}></Route>
            <Route path='/LocationDetails' element={<LocationDetails />}></Route>
          </Routes>
        </Router>
      </div>
      <footer>
            <p>&copy; 2024 Germ Squad</p> 
        </footer>
    </div>
  );
}

export default App;