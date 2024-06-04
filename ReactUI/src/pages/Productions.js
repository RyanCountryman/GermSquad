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


    //Send POST request to create new Productions Entry
    const addProduction = async (e) =>{
        if(!plantID || !startDate){
            alert("Plant Type and a Start Date are required to create a Production");
            resetForm();
            return;
        }

        const response = await fetch(`${URL}/CreateProduction`, {
            method: 'POST',
            body: JSON.stringify({ plantID, startDate, endDate, waterFrequency, fertilizerFrequency, totalYield}),
            headers: {'Content-Type': 'application/json'}
        })

        if(response.ok) {
            alert("New Production Added!");
            loadProductions();
            resetForm();
        }else{
            console.error('Failed to create new production entry');
        }
    }


    //Send GET request to obtain current information on selected entry and enter edit mode
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


    //Send PUT request to update selected entry
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
            alert("Productions Entry Updated!");
        } else {
            console.error('Failed to update productions entry');
        }
    }


    //Send DELETE request on selected entry
    const deleteProduction = async (productionID) =>{
        const response = await fetch(`${URL}/DeleteProduction/${productionID}`, { method: 'DELETE' });
        if(response.ok){
            alert("Productions entry removed!");
            loadProductions();
        } else{
            console.error(`Failed to delete Production with productionID = ${productionID}, status code = ${response.status}`);
        }
    }


    //Send GET request for all entries of Productions Entity
    const loadProductions = async ()=>{
        const response = await fetch(`${URL}/Productions`);
        const productions = await response.json();
        setProductions(productions);
    }


    //Load Table at first access and after each update
    useEffect(() => {
        loadProductions();
    })


    //Reset State variables contained in form
    const resetForm = () =>{
        setPlantID("");
        setStartDate("");
        setEndDate("");
        setWaterFrequency("");
        setFertilizerFrequency("");
        setTotalYield("");
    }


    //Navigate form submit to needed operation
    const submitHandler = async(e) =>{
        e.preventDefault();
        if(edit){
            updateProduction();
        }else{
            addProduction();
        }
    }


    //Fill Table Component
    const customClass = "plantTable"
    const theadData = ["Production ID", "Plant ID", "Plant Name", "Start Date", "End Production Date", "Water Frequency", "Fertilizer Frequency", "Total Yield","Fertilizer","Location", "Modify"];

    const tbodyData = productions.map(production => {
        const dateStarted = new Date(production.startDate);
        const dateEnded = production.endProduction ? new Date(production.endProduction): null;
        const growLocation = production.isGround ? production.bedType : production.containerType;  
        return {
            id: production.productionID,
            items: [
                production.productionID,
                production.plantID,
                production.plantType,
                dateStarted.toLocaleDateString(),
                dateEnded ? dateEnded.toLocaleDateString() : dateEnded,
                production.waterFrequency ? `Every ${production.waterFrequency} Days` : "",
                production.fertilizerFrequency ? `Every ${production.fertilizerFrequency} Days` : "",
                production.yield ? `${production.yield} Pounds` : "",
                production.fertilizerType,
                growLocation,
                <Buttons key={production.id} onEditClick={()=> editProduction(production.productionID)} onDeleteClick={()=> deleteProduction(production.productionID)} />
            ]
        }
    });


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
                        <form onSubmit={submitHandler}>
                            <fieldset>
                                <legend>{edit ? "Edit Entry" : "Which plant is this?"}</legend>
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