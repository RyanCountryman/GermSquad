import React, {useState, useEffect} from 'react';
import URL from '../config'


//Create Dynamically populated dropdown menu of Growths
const GrowthsDropDown = ({selectedGrowthID, setSelectedGrowthID}) =>{
    const [growths, setGrowths] = useState([]);

    const populateDropDown = async ()=>{
        const response = await fetch(`${URL}/GrowthsDrop`);
        const growths = await response.json();
        setGrowths(growths);
    }

    useEffect(() => {
        populateDropDown();
    }, []);

    const handleChange = (e) => {
        setSelectedGrowthID(e.target.value);
    }

    return(
        <select onChange={handleChange} value={selectedGrowthID}>
            <option value= ""> Select a Growth </option>
            {growths.map((growth)=>(
                <option key={growth.growthID} value={growth.growthID}>ID: {growth.growthID} - {growth.plantType}</option>
                
            ))}
        </select>
    )
};

export default GrowthsDropDown;