import React, {useState, useEffect} from 'react';
import URL from '../config'


//Create Dynamically populated dropdown menu of Fertilizers
const FertilizersDropDown = ({selectedFertilizerID, setSelectedFertilizerID}) =>{
    const [fertilizers, setFertilizers] = useState([]);

    const populateDropDown = async ()=>{
        const response = await fetch(`${URL}/FertilizersDrop`);
        const fertilizers = await response.json();
        setFertilizers(fertilizers);
    }

    useEffect(() => {
        populateDropDown();
    }, []);

    const handleChange = (e) => {
        setSelectedFertilizerID(e.target.value);
    }

    return(
        <select onChange={handleChange} value={selectedFertilizerID}>
            <option value= ""> Select a Fertilizer </option>
            {fertilizers.map((fertilizer)=>(
                <option key={fertilizer.fertilizerID} value={fertilizer.fertilizerID}>ID: {fertilizer.fertilizerID} - {fertilizer.fertilizerType}</option>
                
            ))}
        </select>
    )
};

export default FertilizersDropDown;