import React, {useState, useEffect} from 'react';

const PlantDropDown = ({selectedPlantID, setSelectedPlantID}) =>{
    const [plants, setPlants] = useState([]);
    //const [selectedPlantID, setSelectedPlantID] = useState('')

    const populateDropDown = async ()=>{
        const response = await fetch('http://localhost:8500/PlantsDrop'); //TODO Change Fetch url
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