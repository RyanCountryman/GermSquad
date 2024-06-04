/* 
Dropdown Design
6/3/2024
Feedback received by another student adapted to create dropdowns for forms.
Author: Fadi Othman
*/
import React, {useState, useEffect} from 'react';
import URL from '../config'


//Create Dynamically populated dropdown menu of Plants
const PlantDropDown = ({selectedPlantID, setSelectedPlantID}) =>{
    const [plants, setPlants] = useState([]);
    
    const populateDropDown = async ()=>{
        const response = await fetch(`${URL}/PlantsDrop`);
        const plants = await response.json();
        setPlants(plants);
    }

    useEffect(() => {
        populateDropDown();
    }, []);

    const handleChange = (e) => {
        setSelectedPlantID(e.target.value);
    }

    return(
        <select onChange={handleChange} value={selectedPlantID}>
            <option value= ""> Select a Plant </option>
            {plants.map((plant)=>(
                <option key={plant.plantID} value={plant.plantID}>ID: {plant.plantID} - {plant.plantType}</option>
                
            ))}
        </select>
    )
};

export default PlantDropDown;