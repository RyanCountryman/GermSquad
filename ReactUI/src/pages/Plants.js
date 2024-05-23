import React, {useState, useEffect} from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';



function Plants() {
    const [plants, setPlants] = useState([]);
    const [edit, setEdit] = useState(false)
    const [editPlantID, setEditPlantID] = useState(null);
    const [plantType, setPlantType] = useState("");
    const [plantName, setPlantName] = useState("");
    const [seasonComplete, setSeasonComplete] = useState("0")
    

    const addPlant = async (e) =>{
        //e.preventDefault();
        //const form = e.target;
        //const formData = new FormData(form);

        //const plantType = formData.get('plantType');
        //const plantName = formData.get('plantName');

        //Ensure no duplicate plantTypes are being submitted to backend
        if((plantType && plantName) || (!plantType && !plantName)){
            alert('Please select a plantType from the drop down or enter a new plant');
            return;
        }

        //Send formData to endpoint to create new plant
        const response = await fetch('http://localhost:8500/CreatePlant', {
            method: 'POST',
            body: JSON.stringify({ plantType, plantName, seasonComplete}),
            headers: {'Content-Type': 'application/json'}
        });

        if(response.ok) {
            loadPlants();
            resetForm();
        }else{
            console.error('Failed to create new plant entry');
        }
    };

    const editPlant = async (plantID) => {
        const response = await fetch(`http://localhost:8500/Plants/${plantID}`);
        if (response.ok) {
            const plant = await response.json();
            //setPlantType(plant.plantType);
            setPlantName(plant.plantName);
            setSeasonComplete(plant.seasonComplete);
            setEdit(true);
            setEditPlantID(plantID);
        } else {
            console.error(`Failed to fetch Plant with plantID = ${plantID}, status code = ${response.status}`);
        }
    };

    const updatePlant = async () =>{
        const response = await fetch(`http://localhost:8500/EditPlant/${editPlantID}`, {
            method: 'PUT',
            body: JSON.stringify({ plantType, plantName, seasonComplete }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            loadPlants();
            resetForm();
            setEdit(false);
            setEditPlantID(null);
        } else {
            console.error('Failed to update plant entry');
        }
    };

    const deletePlant = async (plantID) =>{
        const response = await fetch(`http://localhost:8500/DeletePlant/${plantID}`, { method: 'DELETE' });
        if(response.ok){
            loadPlants();
        } else{
            console.error(`Failed to delete Plant with plantID = ${plantID}, status code = ${response.status}`);
        }
    };
    
    const loadPlants = async ()=>{
        const response = await fetch('http://localhost:8500/Plants'); //TODO Change Fetch url
        const plants = await response.json();
        setPlants(plants);
    }

    const resetForm = () =>{
        setPlantType("");
        setPlantName("");
        setSeasonComplete("0");
    }

    useEffect(() => {
        loadPlants();
    }, []);
    
    const submitHandler = async(e) =>{
        e.preventDefault();
        if(edit){
            updatePlant()
        }else{
            addPlant()
        }
    }


    //Set up table information
    const customClass = "plantTable"
    const theadData = ["Plant ID", "Plant Name", "Season Completed", "Modify"];

    const tbodyData = plants.map(plant => ({
        id: plant.plantID,
        items: [
            plant.plantID,
            plant.plantType,
            plant.seasonComplete ? "Yes" : "No",
            <Buttons key={plant.id}  onEditClick={()=> editPlant(plant.plantID)}  onDeleteClick={()=> deletePlant(plant.plantID)} />
        ]
    }));

    return (
        <body>
            <header>
                <h2>Plants Home Page</h2>
            </header>
            <main id="Plants">
                <div>
                    <Table theadData={theadData} tbodyData={tbodyData} customClass={customClass} />
                </div>
                    
                <section >
                    <h3>{edit ?  "Edit Plant" : "Create New Entry"}</h3>
                    <article>
                        <h5>{edit ?  "" : "What are you planting?"}</h5>
                        <form onSubmit={submitHandler}>
                            <fieldset>
                                <legend>{edit ?  "Edit Entry" : "New Plant"}</legend>
                                <p>
                                    <label htmlFor="plantType">Plant Type </label>
                                    <select name = "plantType" id="plantType" value={plantType} onChange={(e)=> setPlantType(e.target.value)}>
                                        <option value=""></option>
                                        <option value="Tomato">Tomato</option>
                                        <option value="Pepper">Pepper</option>
                                        <option value="Lettuce">Lettuce</option>
                                        <option value="Cucumber">Cucumber</option>
                                        <option value="Squash">Squash</option>
                                        <option value="Oregano">Oregano</option>
                                        <option value="Basil">Basil</option>
                                        <option value="Potato">Potato</option>
                                    </select>
                                </p>
                                <div>
                                    <label htmlFor="plantName">Enter Plant Name </label>
                                    <input type="text" name="plantName" id="plantName" value={plantName} onChange={(e)=> setPlantName(e.target.value)}/>
                                </div>
                                <div>
                                    <label>Season Complete</label>

                                    <input type="radio" name="seasonComplete" id="seasonComplete" value="1" checked={seasonComplete === "1"} onChange={(e)=> setSeasonComplete("1")} />
                                    <label htmlFor="seasonComplete">Yes</label>

                                    <input type="radio" name="seasonComplete" id="seasonNotComplete" value="0" checked={seasonComplete === "0"} onChange={(e)=> setSeasonComplete("0")} />
                                    <label htmlFor="seasonNotComplete">No</label>
                                </div>
                                <p>
                                    <button class="btn btn-submit" type="submit">{edit ? "Update" : "Submit"}</button>
                                </p>
                            </fieldset>
                        </form>
                    </article>
                </section>
            </main>   
    </body> 
    )
}
export default Plants;