import React, {useState, useEffect} from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';
import URL from '../config'

function GrowingLocations() {
    const [growingLocations, setGrowingLocations] = useState([]);
    const [edit, setEdit] = useState(false)
    const [editLocationID, setEditLocationID] = useState(null)
    const [isGround, setIsGround] = useState("0")
    const [isContainer, setIsContainer] = useState("0")
    const [bedType, setBedType] = useState("")
    const [containerType, setContainerType] = useState("")
    const [formLocationType, setFormLocationType] = useState("")

    const customClass = "plantTable"
    const theadData = ["Location ID", "In Ground?", "In Container?", "Bed Type", "Container Type", "Modify"];


    const addGrowingLocation = async (e) =>{
        let isGroundLoc = 0
        let isContainerLoc = 0
        console.log(formLocationType)
        if (formLocationType === "ground"){
            isGroundLoc = 1
            isContainerLoc = 0
            console.log(`isGround: ${isGround} || isContainer: ${isContainer}`)
        }else{
            isGroundLoc = 0
            isContainerLoc = 1
        }
        const response = await fetch(`${URL}/CreateGrowingLocation`, {
            method: 'POST',
            body: JSON.stringify({ isGroundLoc, isContainerLoc, bedType, containerType}),
            headers: {'Content-Type': 'application/json'}
        });

        if(response.ok) {
            loadGrowingLocations();
            resetForm();
        }else{
            console.error('Failed to create new growingLocation entry');
        }
    };        

        //GET GrowingLocation attribute values and store for edit TODO:FIX STATE ISSUES
        const editGrowingLocation = async (locationID) => {
            /*resetForm();
            if (edit){
                 setEdit(false);
    
            } else{
                const response = await fetch(`${URL}/GrowingLocations/${locationID}`);
                if (response.ok) {
                    const growingLocation = await response.json();
                    setIsGround(growingLocation.isGround);
                    setIsContainer(growingLocation.isContainer);
                    isGround ? await setBedType(growingLocation.bedType) :  await setBedType(null);
                    isContainer ? await setContainerType(growingLocation.containerType) : await setContainerType(null);
                    setEdit(true);
                    setEditLocationID(locationID);
                } else {
                    console.error(`Failed to fetch GrowingLocation with locationID = ${locationID}, status code = ${response.status}`);
                }
            //}*/
        };
    
        //Update selected ID with changed values in form TODO:FIX STATE ISSUES
        const updateGrowingLocation = async (isGroundLoc,isContainerLoc) =>{
            /*
            const response = await fetch(`${URL}/EditGrowingLocation/${editLocationID}`, {
                method: 'PUT',
                body: JSON.stringify({ isGroundLoc, isContainerLoc, bedType, containerType }),
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (response.ok) {
                loadGrowingLocations();
                resetForm();
                setEdit(false);
                setEditLocationID(null);
            } else {
                console.error('Failed to update growingLocation entry');
            }
            */
        };


    const deleteGrowingLocation = async (locationID) =>{
        const response = await fetch(`${URL}/DeleteGrowingLocation/${locationID}`, { method: 'DELETE' });
        if(response.ok){
            loadGrowingLocations();
        } else{
            console.error(`Failed to delete GrowingLocation with locationID = ${locationID}, status code = ${response.status}`);
        }
    };


    const tbodyData = growingLocations.map(growingLocation => {  
        return {
            id: growingLocation.locationID,
            items: [
                growingLocation.locationID,
                growingLocation.isGround,
                growingLocation.isContainer,
                growingLocation.isGround ? growingLocation.bedType : "NA",
                growingLocation.isContainer? growingLocation.containerType : "NA",
                <Buttons key={growingLocation.id} onEditClick={()=> editGrowingLocation(growingLocation.locationID)} onDeleteClick={()=> deleteGrowingLocation(growingLocation.locationID)}/>
            ]
        }
    });


    const loadGrowingLocations = async ()=>{
        const response = await fetch(`${URL}/GrowingLocations`); //TODO Change Fetch url
        const growingLocations = await response.json();
        setGrowingLocations(growingLocations);
    }

    const resetForm = () =>{
        setIsGround("0");
        setIsContainer("0");
        setBedType("");
        setContainerType("");
        setFormLocationType("")
    }

    useEffect(() => {
        loadGrowingLocations();
    }, []);

    const submitHandler = async(e) =>{
        e.preventDefault();
        if(edit){
            updateGrowingLocation()
        }else{
            addGrowingLocation()
        }
    }


    return (
        <body>
            <header>
                <h2>Growing Locations Page</h2>
            </header>
            <main id="GrowingLoc">
                <div>
                    <Table theadData={theadData} tbodyData={tbodyData} customClass={customClass} />
                </div>
                <section >
                    <h3>{edit ?  "Edit Growing Location" : "Create New Entry"}</h3>
                    <article>
                        <form onSubmit={submitHandler}>
                            <fieldset>
                                <legend>{edit ?  "Edit Entry" : "New Growing Location"}</legend>
                                <p>
                                    <label htmlFor="location">Location Type </label>
                                    <select name = "locationType" id="locationType" value={formLocationType} onChange={(e)=> setFormLocationType(e.target.value)}>
                                        <option value=""></option>
                                        <option value="ground">Ground</option>
                                        <option value="container">Container</option>
                                    </select>
                                </p>
                                {formLocationType === "ground" &&(
                                    <p>
                                        <label htmlFor="bedType">Type of bed </label>
                                        <input type="text" name="bedType" id="bedType" value={bedType} onChange={(e)=> setBedType(e.target.value)}/>
                                    </p>
                                )}
                                {formLocationType === "container" &&(
                                    <p>
                                        <label htmlFor="containerType">Type of container </label>
                                        <input type="text" name="containerType" id="containerType" value={containerType} onChange={(e)=> setContainerType(e.target.value)}/>
                                    </p>
                                )}
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
export default GrowingLocations;