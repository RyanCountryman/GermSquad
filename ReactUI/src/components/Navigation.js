import { Link } from 'react-router-dom';
import React, { useState } from "react";
import './nav.css';  


//Navigation tool to specified pages
function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="App-nav">
            <button className="menu-toggle" onClick={toggleMenu}>
            Menu
            </button>
            <div className={`nav-links ${isOpen ? 'open' : ''}`}>
                <Link to='/'>Home</Link>
                <Link to='/Plants'>Plants</Link>
                <Link to='/Seedlings'>Seedlings</Link>
                <Link to='/Growths'>Growths</Link>
                <Link to='/Productions'>Productions</Link>
                <Link to='/Fertilizers'>Fertilizers</Link>
                <Link to='/GrowingLocations'>Growing Locations</Link>
                <Link to='/FertilizerDetails'>Fertilizer Details</Link>
                <Link to='/LocationDetails'>Location Details</Link>
            </div>
        </nav>
    )
}

export default Navigation;