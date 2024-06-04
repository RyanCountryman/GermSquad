import React, {useState, useEffect} from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';
import PlantsDropDown from '../components/PlantsDropdown';
import URL from '../config';

function Growths() {
    const [growths, setGrowths] = useState([]);
    const [edit, setEdit] = useState(false)
    const [editGrowthID, setEditGrowthID] = useState(null)
    const [plantID, setPlantID] = useState("")
    const [startDate, setStartDate] = useState("")
    const [dailySunlight, setDailySunlight] = useState("")
    const [waterFrequency, setWaterFrequency] = useState("")
    const [fertilizerFrequency, setFertilizerFrequency] = useState("") 


    //Send POST request to create new Growths Entry
    const addGrowth = async (e) =>{
        if(!plantID || !startDate){
            alert("Plant Type and a Start Date are required to create a Growth");
            resetForm();
            return;
        }

        const response = await fetch(`${URL}/CreateGrowth`, {
            method: 'POST',
            body: JSON.stringify({ plantID, startDate, dailySunlight, waterFrequency, fertilizerFrequency}),
            headers: {'Content-Type': 'application/json'}
        })

        if(response.ok) {
            loadGrowths();
            resetForm();
            alert("Growths Entry Added!");
        }else{
            console.error('Failed to create new growths entry');
        }
    }


    //Send GET request to obtain current information on selected entry and enter edit mode
    const editGrowth = async (growthID) => {
        resetForm();
        if (edit){
             setEdit(false)
        } else{
            const response = await fetch(`${URL}/Growths/${growthID}`);
            if (response.ok) {
                const growth = await response.json();
                setStartDate(growth.startDate)
                setDailySunlight(growth.dailySunlight)
                setWaterFrequency(growth.waterFrequency)
                setFertilizerFrequency(growth.fertilizerFrequency)
                setEdit(true);
                setEditGrowthID(growthID);
            } else {
                console.error(`Failed to fetch Growth with growthID = ${growthID}, status code = ${response.status}`);
            }
        }
    }


    //Send PUT request to update selected entry
    const updateGrowth = async () =>{
        const response = await fetch(`${URL}/EditGrowth/${editGrowthID}`, {
            method: 'PUT',
            body: JSON.stringify({ plantID, startDate, dailySunlight, waterFrequency, fertilizerFrequency }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            loadGrowths();
            resetForm();
            setEdit(false);
            setEditGrowthID(null);
            alert("Growths Entry Updated!");
        } else {
            console.error('Failed to update Growths entry');
        }
    }


    //Send DELETE request on selected entry
    const deleteGrowth = async (growthID) =>{
        const response = await fetch(`${URL}/DeleteGrowth/${growthID}`, { method: 'DELETE' });
        if(response.ok){
            loadGrowths();
            alert("Growths Entry Removed!");
        } else{
            console.error(`Failed to delete Growths with growthID = ${growthID}, status code = ${response.status}`);
        }
    }


    //Send GET request for all entries of Growths Entity
    const loadGrowths = async ()=>{
        const response = await fetch(`${URL}/Growths`);
        const growths = await response.json();
        setGrowths(growths);
    }


    //Load Table at first access and after each update
    useEffect(() => {
        loadGrowths();
    })


    //Reset State variables contained in form
    const resetForm = () =>{
        setPlantID("");
        setStartDate("");
        setDailySunlight("");
        setWaterFrequency("");
        setFertilizerFrequency("");
    }


    //Navigate form submit to needed operation
    const submitHandler = async(e) =>{
        e.preventDefault();
        if(edit){
            updateGrowth();
        }else{
            addGrowth();
        }
    }


    // Fill Growths Table
    const customClass = "plantTable"
    const theadData = ["Growth ID", "Plant ID", "Plant Name", "Start Date", "Daily Sunlight Needed", "Water Frequency", "Fertilizer Frequency","Fertilizer","Location", "Modify"];

    const tbodyData = growths.map(growth => {
        const startDate = new Date(growth.startDate);
        const growLocation = growth.isGround ? growth.bedType : growth.containerType;  
        return {
            id: growth.growthID,
            items: [
                growth.growthID,
                growth.plantID,
                growth.plantType,
                startDate.toLocaleDateString(),
                growth.dailySunlight ? `${growth.dailySunlight} Hours` : "",
                growth.waterFrequency ? `Every ${growth.waterFrequency} Days` : "",
                growth.fertilizerFrequency ? `Every ${growth.fertilizerFrequency} Days`: "",
                growth.fertilizerType,
                growLocation,
                <Buttons key={growth.id} onEditClick={()=> editGrowth(growth.growthID)} onDeleteClick={()=> deleteGrowth(growth.growthID)} />
            ]
        }
    })


    return (
        <body>
        <header>
            <h2>Growths Page</h2>
        </header>
        <main id="Growths">
            <div>
                <Table theadData={theadData} tbodyData={tbodyData} customClass={customClass} />
            </div>
            <section >
                <h3>{edit ? "Edit Growth" : "Create New Entry"}</h3>
                <article>
                    <form onSubmit={submitHandler}>
                        <fieldset>
                            <legend>{edit ? "" : "Which plant is this?"}</legend>
                            {!edit && (   
                                <p>
                                    <label htmlFor="Growth">Plant Type </label>
                                    <PlantsDropDown selectedPlantID={plantID} setSelectedPlantID={setPlantID}></PlantsDropDown>
                                </p>
                            )} 
                            <p>
                                <label htmlFor="startDate">Start Date </label>
                                <input type="Date" name="startDate" id="startDate" value={startDate} onChange={(e)=> setStartDate(e.target.value)}/>
                            </p>
                            <p>
                                <label htmlFor="dailySunlight">Daily Sunlight Needed (Hours) </label>
                                <input type="number" name="dailySunlight" id="dailySunlight" value={dailySunlight} onChange={(e)=> setDailySunlight(e.target.value)}/>
                            </p>
                            <p>
                                <label htmlFor="waterFreq">Water Frequency (Days) </label>
                                <input type="number" name="waterFreq" id="waterFreq" value={waterFrequency} onChange={(e)=> setWaterFrequency(e.target.value)}/> 
                            </p>
                            <p>
                                <label htmlFor="fertFreq">Fertilizer Frequency (Days) </label>
                                <input type="number" name="fertFreq" id="fertFreq" value={fertilizerFrequency} onChange={(e)=> setFertilizerFrequency(e.target.value)}/> 
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
export default Growths;