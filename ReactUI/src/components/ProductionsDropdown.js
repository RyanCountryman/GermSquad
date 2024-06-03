import React, {useState, useEffect} from 'react';
import URL from '../config'


//Create Dynamically populated dropdown menu of Productions
const ProductionsDropDown = ({selectedProductionID, setSelectedProductionID}) =>{
    const [productions, setProductions] = useState([]);

    const populateDropDown = async ()=>{
        const response = await fetch(`${URL}/ProductionsDrop`);
        const productions = await response.json();
        setProductions(productions);
    }

    useEffect(() => {
        populateDropDown();
    }, []);

    const handleChange = (e) => {
        setSelectedProductionID(e.target.value);
    }

    return(
        <select onChange={handleChange} value={selectedProductionID}>
            <option value= ""> Select a Production </option>
            {productions.map((production)=>(
                <option key={production.productionID} value={production.productionID}>ID: {production.productionID} - {production.plantType}</option>
                
            ))}
        </select>
    )
};

export default ProductionsDropDown;