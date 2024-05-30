import React, {useState, useEffect} from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';
import PlantsDropDown from '../components/PlantsDropdown';
import URL from '../config';


function Seedlings() {
    const [seedlings, setSeedlings] = useState([]);
    const [edit, setEdit] = useState(false)
    const [editSeedlingID, setEditSeedlingID] = useState(null)
    const [plantID, setPlantID] = useState("")
    const [datePlanted, setDatePlanted] = useState("")
    const [aveTemperature, setAveTemperature] = useState("")
    const [waterFrequency, setWaterFreq] = useState("")
    const [germinationTime, setGerminationTime] = useState("")    


    const addSeedling = async (e) =>{
        const response = await fetch(`${URL}/CreateSeedling`, {
            method: 'POST',
            body: JSON.stringify({ plantID, datePlanted, aveTemperature, waterFrequency, germinationTime}),
            headers: {'Content-Type': 'application/json'}
        });

        if(response.ok) {
            loadSeedlings();
            resetForm();
        }else{
            console.error('Failed to create new seedling entry');
        }
    };


    const editSeedling = async (seedlingID) => {
        resetForm();
        if (edit){
             setEdit(false)
        } else{
            const response = await fetch(`${URL}/Seedlings/${seedlingID}`);
            if (response.ok) {
                const seedling = await response.json();
                setDatePlanted(seedling.datePlanted)
                setAveTemperature(seedling.aveTemperature)
                setWaterFreq(seedling.waterFrequency)
                setGerminationTime(seedling.germinationTime)
                setEdit(true);
                setEditSeedlingID(seedlingID);
            } else {
                console.error(`Failed to fetch Seedling with seedlingID = ${seedlingID}, status code = ${response.status}`);
            }
        }
    };

    const updateSeedling = async () =>{
        const response = await fetch(`${URL}/EditSeedling/${editSeedlingID}`, {
            method: 'PUT',
            body: JSON.stringify({ plantID, datePlanted, aveTemperature, waterFrequency, germinationTime }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            loadSeedlings();
            resetForm();
            setEdit(false);
            setEditSeedlingID(null);
        } else {
            console.error('Failed to update seedling entry');
        }
    };

    const deleteSeedling = async (seedlingID) =>{
        const response = await fetch(`${URL}/DeleteSeedling/${seedlingID}`, { method: 'DELETE' });
        if(response.ok){
            loadSeedlings();
        } else{
            console.error(`Failed to delete Seedling with seedlingID = ${seedlingID}, status code = ${response.status}`);
        }
    };



    //Filling Seedlings Table
    const customClass = "plantTable"
    const theadData = ["Seedling ID", "Plant ID", "Plant Name", "Date Planted", "Soil Temperature", "Water Frequency", "Days to germinate", "Modify"];

    const tbodyData = seedlings.map(seedling => {
        const datePlanted = new Date(seedling.datePlanted);
        return {
            id: seedling.seedlingID,
            items: [
                seedling.seedlingID,
                seedling.plantID,
                seedling.plantType,
                datePlanted.toLocaleDateString(),
                seedling.aveTemperature,
                `Every ${seedling.waterFrequency} Days`,
                seedling.germinationTime,
                <Buttons key={seedling.ID} onEditClick={()=> editSeedling(seedling.seedlingID)} onDeleteClick={()=> deleteSeedling(seedling.seedlingID)}  />
            ]
        }
    });

    const loadSeedlings = async ()=>{
        const response = await fetch(`${URL}/Seedlings`); //TODO Change Fetch url
        const seedlings = await response.json();
        setSeedlings(seedlings);

    }

    const resetForm = () =>{
        setPlantID("")
        setDatePlanted("")
        setAveTemperature("")
        setWaterFreq("")
        setGerminationTime("")
    }

    useEffect(() => {
        loadSeedlings();
    })

    const submitHandler = async(e) =>{
        e.preventDefault();
        if(edit){
            updateSeedling();
        }else{
            addSeedling();
        }
    }


    return (
        <body>
            <header>
                <h2>Seedlings Page</h2>
            </header>
            <main id="Seedlings">
                <div>
                    <Table theadData={theadData} tbodyData={tbodyData} customClass={customClass} />
                </div>
                <section >
                <h3>{edit ?  "Edit Seedling" : "Create New Entry"}</h3>
                    <article>
                        <h5>{edit ?  "" : "What are you planting?"}</h5>
                        <form onSubmit={submitHandler}>
                            <fieldset> 
                                <legend>{edit ?  "Edit Entry" : "New Seedling"}</legend>
                                {!edit && (
                                    <p>
                                        <label htmlFor="plantType">Plant Type </label>
                                        <PlantsDropDown selectedPlantID={plantID} setSelectedPlantID={setPlantID}></PlantsDropDown>
                                    </p>
                                )}
                                <p>
                                    <label htmlFor="plantingDate">Date Planted </label>
                                    <input type="Date" name="plantingDate" id="plantingDate" value={datePlanted} onChange={(e)=> setDatePlanted(e.target.value)}/>
                                </p>
                                <p>
                                    <label htmlFor="temperature">Soil Temperature(Degrees F) </label>
                                    <input type="number" name="temperature" id="temperature" value={aveTemperature} onChange={(e)=> setAveTemperature(e.target.value)}/>
                                </p>
                                <p>
                                    <label htmlFor="waterFreq">Water Frequency (Days) </label>
                                    <input type="number" name="waterFreq" id="waterFreq" value={waterFrequency} onChange={(e)=> setWaterFreq(e.target.value)}/>
                                </p>
                                <p>
                                    <label htmlFor="germinationTime">Days to Germinate </label>
                                    <input type="number" name="germinationTime" id="germinationTime" value={germinationTime} onChange={(e)=> setGerminationTime(e.target.value)}/>
                                </p> 
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
export default Seedlings;