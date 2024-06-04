/* 
Dropdown Design
6/3/2024
Feedback received by another student adapted to create dropdowns for forms.
Author: Fadi Othman
*/
import React, {useState, useEffect} from 'react';
import URL from '../config'


//Create Dynamically populated dropdown menu of Plant Types
const PlantTypesDropDown = ({selectedPlantType, setSelectedPlantType}) =>{
    const [plantTypes, setPlantTypes] = useState([]);

    const populateDropDown = async ()=>{
        const response = await fetch(`${URL}/PlantsTypeDrop`);
        const plantTypes = await response.json();
        setPlantTypes(plantTypes);
    }

    useEffect(() => {
        populateDropDown();
    }, []);

    const handleChange = (e) => {
        setSelectedPlantType(e.target.value);
    }

    return(
        <select onChange={handleChange} value={selectedPlantType}>
            <option value= ""> Select a Plant Type </option>
            {plantTypes.map((plantType)=>(
                <option key={plantType.plantType} value={plantType.plantType}>{plantType.plantType}</option>
                
            ))}
        </select>
    )
};

export default PlantTypesDropDown;