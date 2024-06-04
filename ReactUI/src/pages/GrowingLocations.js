import React, {useState, useEffect} from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';
import URL from '../config'

function GrowingLocations() {
    const [growingLocations, setGrowingLocations] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editLocationID, setEditLocationID] = useState(null);
    const [isGround, setIsGround] = useState("0")
    const [isContainer, setIsContainer] = useState("0")
    const [bedType, setBedType] = useState("");
    const [containerType, setContainerType] = useState("");
    const [formLocationType, setFormLocationType] = useState("");


    //Send POST request to create new GrowingLocations Entry
    const addGrowingLocation = async (e) =>{
        let isGroundLoc = (formLocationType === "ground") ? 1 : 0;
        let isContainerLoc = (formLocationType === "container") ? 1 : 0;
        
        if((isGroundLoc === 0 && isContainerLoc ===0) || (!bedType && !containerType)){
            alert("Please Select a location type and enter the respective type of growing location!");
            resetForm();
            return;
        }
        const response = await fetch(`${URL}/CreateGrowingLocation`, {
            method: 'POST',
            body: JSON.stringify({ isGroundLoc, isContainerLoc, bedType, containerType}),
            headers: {'Content-Type': 'application/json'}
        });

        if(response.ok) {
            alert("New Growing Location Added!");
            loadGrowingLocations();
            resetForm();
        }else{
            console.error('Failed to create new Growing Location entry');
        }
    };        


    //Send GET request to obtain current information on selected entry and enter edit mode
    const editGrowingLocation = async (locationID) => {
        resetForm();
        if (edit){
            setEdit(false);
        } else{
            const response = await fetch(`${URL}/GrowingLocations/${locationID}`);
            if (response.ok) {
                const growingLocation = await response.json();
                setIsGround(growingLocation.isGround);
                setIsContainer(growingLocation.isContainer);
                setBedType(growingLocation.bedType);
                setContainerType(growingLocation.containerType);
                setEdit(true);
                setEditLocationID(locationID);
            } else {
                console.error(`Failed to fetch Growing Location with locationID = ${locationID}, status code = ${response.status}`);
            }
        }
    };
    

    //Send PUT request to update selected entry
    const updateGrowingLocation = async () =>{
        let isGroundLoc = (formLocationType === 'ground')? 1 : 0;
        let isContainerLoc = (formLocationType === 'container')? 1 : 0;

        if((isGroundLoc === 0 && isContainerLoc === 0)){
            alert("Please select a location type and then enter location details");
            resetForm();
            return;
        }

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
            alert("Growing Location Entry Updated!");
        } else {
            console.error('Failed to update Growing Location entry');
            resetForm();
            setEdit(false);
        }
        
    };


    //Send DELETE request on selected entry
    const deleteGrowingLocation = async (locationID) =>{
        const response = await fetch(`${URL}/DeleteGrowingLocation/${locationID}`, { method: 'DELETE' });
        if(response.ok){
            alert("Growing Location entry removed!");
            loadGrowingLocations();
        } else{
            console.error(`Failed to delete Growing Location with locationID = ${locationID}, status code = ${response.status}`);
        }
    };


    //Send GET request for all entries of GrowingLocations Entity
    const loadGrowingLocations = async ()=>{
        const response = await fetch(`${URL}/GrowingLocations`); 
        const growingLocations = await response.json();
        setGrowingLocations(growingLocations);
    }


    //Load Table at first access and after each update
    useEffect(() => {
        loadGrowingLocations();
    }, []);


    //Reset State variables contained in form
    const resetForm = () =>{
        setIsGround("0");
        setIsContainer("0");
        setBedType("");
        setContainerType("");
        setFormLocationType("");
    }


    //Navigate form submit to needed operation
    const submitHandler = async(e) =>{
        e.preventDefault();
        if(edit){
            updateGrowingLocation()
        }else{
            addGrowingLocation()
        }
    }


    //Fill Table Component
    const customClass = "plantTable"
    const theadData = ["Location ID", "Is Ground", "Is Container", "Bed Type", "Container Type", "Modify"];
    
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