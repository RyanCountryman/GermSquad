import React from 'react';
import { Link } from 'react-router-dom'

function Navigation() {
    return (
        <nav className="App-nav">
            <Link to='/'>Home</Link>
            <Link to='/Plants'>Plants</Link>
            <Link to='/Seedlings'>Seedlings</Link>
            <Link to='/Growths'>Growths</Link>
            <Link to='/Productions'>Productions</Link>
            <Link to='/Fertilizers'>Fertilizers</Link>
            <Link to='/GrowingLocations'>GrowingLocations</Link>
            <Link to='/FertilizerDetails'>FertilizerDetails</Link>
            <Link to='/LocationDetails'>LocationDetails</Link>
        </nav>
    )
}

export default Navigation;