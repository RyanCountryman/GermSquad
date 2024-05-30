import React, {useState, useEffect} from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';
import PlantsDropDown from '../components/PlantsDropdown'
import URL from '../config'

function Productions() {
    const [productions, setProductions] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editProductionID, setEditProductionID] = useState(null)
    const [plantID, setPlantID] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [waterFrequency, setWaterFrequency] = useState("")
    const [fertilizerFrequency, setFertilizerFrequency] = useState("")
    const [totalYield, setTotalYield] = useState("")



    const addProduction = async (e) =>{
        const response = await fetch(`${URL}/CreateProduction`, {
            method: 'POST',
            body: JSON.stringify({ plantID, startDate, endDate, waterFrequency, fertilizerFrequency, totalYield}),
            headers: {'Content-Type': 'application/json'}
        })

        if(response.ok) {
            loadProductions();
            resetForm();
        }else{
            console.error('Failed to create new production entry');
        }
    }


    const editProduction = async (productionID) => {
        resetForm();
        if (edit){
             setEdit(false)
        } else{
            const response = await fetch(`${URL}/Productions/${productionID}`);
            if (response.ok) {
                const production = await response.json();
                setStartDate(production.startDate);
                setEndDate(production.endProduction);
                setWaterFrequency(production.waterFrequency);
                setFertilizerFrequency(production.fertilizerFrequency);
                setTotalYield(production.yield);
                setEdit(true);
                setEditProductionID(productionID);
            } else {
                console.error(`Failed to fetch Production with productionID = ${productionID}, status code = ${response.status}`);
            }
        }
    }

    const updateProduction = async () =>{
        const response = await fetch(`${URL}/EditProduction/${editProductionID}`, {
            method: 'PUT',
            body: JSON.stringify({ plantID, startDate, endDate, waterFrequency, fertilizerFrequency, totalYield }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            loadProductions();
            resetForm();
            setEdit(false);
            setEditProductionID(null);
        } else {
            console.error('Failed to update production entry');
        }
    }


    const DeleteProduction = async (productionID) =>{
        const response = await fetch(`${URL}/DeleteProduction/${productionID}`, { method: 'DELETE' });
        if(response.ok){
            loadProductions();
        } else{
            console.error(`Failed to delete Production with productionID = ${productionID}, status code = ${response.status}`);
        }
    }


    // Fill Productions Table
    const customClass = "plantTable"
    const theadData = ["Production ID", "Plant ID", "Plant Name", "Start Date", "End Production Date", "Water Frequency", "Fertilizer Frequency", "Total Yield","Fertilizer","Location", "Modify"];

    const tbodyData = productions.map(production => {
        const dateStarted = new Date(production.startDate);
        const dateEnded = new Date(production.endProduction);
        const growLocation = production.isGround ? production.bedType : production.containerType;  
        return {
            id: production.productionID,
            items: [
                production.productionID,
                production.plantID,
                production.plantType,
                dateStarted.toLocaleDateString(),
                dateEnded.toLocaleDateString(),
                `Every ${production.waterFrequency} Days`,
                `Every ${production.fertilizerFrequency} Days`,
                `${production.yield} Pounds`,
                production.fertilizerType,
                growLocation,
                <Buttons key={production.id} onEditClick={()=> editProduction(production.productionID)} onDeleteClick={()=> DeleteProduction(production.productionID)} />
            ]
        }
    });
    const loadProductions = async ()=>{
        const response = await fetch(`${URL}/Productions`); //TODO Change Fetch url
        const productions = await response.json();
        setProductions(productions);
    }

    useEffect(() => {
        loadProductions();
    })

    const resetForm = () =>{
        setPlantID("");
        setStartDate("");
        setEndDate("");
        setWaterFrequency("");
        setFertilizerFrequency("");
        setTotalYield("");
    }

    const submitHandler = async(e) =>{
        e.preventDefault();
        if(edit){
            updateProduction();
        }else{
            addProduction();
        }
    }

    return (
        <body>
            <header>
                <h2>Productions Page</h2>
            </header>
            <main id="Productions">
                <div>
                    <Table theadData={theadData} tbodyData={tbodyData} customClass={customClass} />
                </div>
                <section >
                    <h3>{edit ? "Edit Production" : "Create New Entry"}</h3>
                    <article>
                        <h5>{edit ? "" : "Which plant is this?"}</h5>
                        <form onSubmit={submitHandler}>
                            <fieldset>
                                <legend>{edit ? "Edit Entry" : "New Production"}</legend>
                                {!edit && (   
                                    <p>
                                        <label htmlFor="Production">Plant Type </label>
                                        <PlantsDropDown selectedPlantID={plantID} setSelectedPlantID={setPlantID}></PlantsDropDown>
                                    </p>
                                )}
                                <p>
                                    <label htmlFor="startDate">Start Date </label>
                                    <input type="Date" name="startDate" id="startDate" value={startDate} onChange={(e)=> setStartDate(e.target.value)}/>
                                </p>
                                <p>
                                    <label htmlFor="endDate">Production End Date </label>
                                    <input type="Date" name="endDate" id="endDate" value={endDate} onChange={(e)=> setEndDate(e.target.value)}/>
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
                                    <label htmlFor="yield">Yield (Pounds) </label>
                                    <input type="number" name="yield" id="yield" value={totalYield} onChange={(e)=> setTotalYield(e.target.value)}/> 
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
export default Productions;