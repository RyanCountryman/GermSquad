import React, {useState, useEffect} from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';
import URL from '../config';
import PlantTypesDropDown from '../components/PlantsTypeDropdown';



function Plants() {
    const [plants, setPlants] = useState([]);
    const [edit, setEdit] = useState(false)
    const [editPlantID, setEditPlantID] = useState(null);
    const [plantType, setPlantType] = useState("");
    const [plantName, setPlantName] = useState("");
    const [seasonComplete, setSeasonComplete] = useState("0")
    

    //Send POST request to create new Plants Entry
    const addPlant = async (e) =>{
        if((plantType && plantName) || (!plantType && !plantName)){
            alert('Please either select an existing plant from the drop down or enter a new plant!');
            return;
        }

        const response = await fetch(`${URL}/CreatePlant`, {
            method: 'POST',
            body: JSON.stringify({ plantType, plantName, seasonComplete}),
            headers: {'Content-Type': 'application/json'}
        });

        if(response.ok) {
            loadPlants();
            resetForm();
            alert("Plants Entry Added!");
        }else{
            console.error('Failed to create new plant entry');
        }
    };


    //Send GET request to obtain current information on selected entry and enter edit mode
    const editPlant = async (plantID) => {
        resetForm();
        if (edit){
             setEdit(false);

        } else{
            const response = await fetch(`${URL}/Plants/${plantID}`);
            if (response.ok) {
                const plant = await response.json();
                setPlantName(plant.plantName);
                setSeasonComplete(plant.seasonComplete);
                setEdit(true);
                setEditPlantID(plantID);
            } else {
                console.error(`Failed to fetch Plant with plantID = ${plantID}, status code = ${response.status}`);
            }
        }
    };


    //Send PUT request to update selected entry
    const updatePlant = async () =>{
        const response = await fetch(`${URL}/EditPlant/${editPlantID}`, {
            method: 'PUT',
            body: JSON.stringify({ plantType, plantName, seasonComplete }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            loadPlants();
            resetForm();
            setEdit(false);
            setEditPlantID(null);
            alert("Plants Entry Updated!");
        } else {
            console.error('Failed to update plants entry');
        }
    };


    //Send DELETE request on selected entry
    const deletePlant = async (plantID) =>{
        const response = await fetch(`${URL}/DeletePlant/${plantID}`, { method: 'DELETE' });
        if(response.ok){
            loadPlants();
            alert("Plants Entry Removed!");
        } else{
            console.error(`Failed to delete Plant with plantID = ${plantID}, status code = ${response.status}`);
        }
    };
    

    //Send GET request for all entries of Plants Entity
    const loadPlants = async ()=>{
        const response = await fetch(`${URL}/Plants`);
        const plants = await response.json();
        setPlants(plants);
    }


    //Load Table at first access and after each update
    useEffect(() => {
        loadPlants();
    }, []);

    
    //Reset State variables contained in form
    const resetForm = () =>{
        setPlantType("");
        setPlantName("");
        setSeasonComplete("0");
    }


    //Navigate form submit to needed operation
    const submitHandler = async(e) =>{
        e.preventDefault();
        if(edit){
            updatePlant()
        }else{
            addPlant()
        }
    }


    //Fill Table Component
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

                        <form onSubmit={submitHandler}>
                            <fieldset>
                                <p>
                                    <label htmlFor="plantType">Select From Existing Plant Types</label>
                                    <PlantTypesDropDown selectedPlantType={plantType} setSelectedPlantType={setPlantType}></PlantTypesDropDown>
                                </p>
                                <div>
                                    <label htmlFor="plantName">Create New Plant Type</label>
                                    <input type="text" name="plantName" id="plantName" value={plantName} onChange={(e)=> setPlantName(e.target.value)}/>
                                </div>
                                <div >
                                    <label>Has the Plant Been Harvested?</label>
                                    <div class="season">
                                    <label htmlFor="seasonComplete">Yes</label>
                                    <input type="radio" name="seasonComplete" id="seasonComplete" value="1" checked={seasonComplete === "1"} onChange={(e)=> setSeasonComplete("1")} />

                                    <label htmlFor="seasonNotComplete">No</label>
                                    <input type="radio" name="seasonComplete" id="seasonNotComplete" value="0" checked={seasonComplete === "0"} onChange={(e)=> setSeasonComplete("0")} />
                                    </div>    
                                </div>
                                <p>
                                    <button className="btn btn-submit" type="submit">{edit ? "Update" : "Submit"}</button>
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