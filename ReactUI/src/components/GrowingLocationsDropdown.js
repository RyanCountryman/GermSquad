/* 
Dropdown Design
6/3/2024
Feedback received by another student adapted to create dropdowns for forms.
Author: Fadi Othman
*/
import React, {useState, useEffect} from 'react';
import URL from '../config'


//Create Dynamically populated dropdown menu of GrowingLocations
const LocationsDropDown = ({selectedLocationID, setSelectedLocationID}) =>{
    const [locations, setLocations] = useState([]);

    const populateDropDown = async ()=>{
        const response = await fetch(`${URL}/LocationsDrop`);
        const locations = await response.json();
        setLocations(locations);
    }

    useEffect(() => {
        populateDropDown();
    }, []);

    const handleChange = (e) => {
        setSelectedLocationID(e.target.value);
    }

    return(
        <select onChange={handleChange} value={selectedLocationID}>
            <option value= ""> Select a Location </option>
            {locations.map((location)=>(
                <option key={location.locationID} value={location.locationID}>ID: {location.locationID} - {location.isGround === 1? 'Ground': 'Container'} - {location.isGround === 1? location.bedType : location.containerType}</option>
                
            ))}
        </select>
    )
};

export default LocationsDropDown;