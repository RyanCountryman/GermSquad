import React, {useState, useEffect} from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';
import URL from '../config'
import GrowthsDropDown from '../components/GrowthsDropdown';
import ProductionsDropDown from '../components/ProductionsDropdown';
import LocationsDropDown from '../components/GrowingLocationsDropdown';

function LocationDetails() {
    const [locationDetails, setLocationDetails] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editLocationDetailsID, setEditLocationDetailsID] = useState(null);
    const [growthsID, setGrowthsID] = useState(null);
    const [productionsID, setProductionsID] = useState(null);
    const [locationsID, setLocationsID] = useState(null);

    //Send POST request to create new LocationDetails Entry
    const addLocationDetails = async (e) =>{
        const response = await fetch(`${URL}/CreateLocationDetails`, {
            method: 'POST',
            body: JSON.stringify({ locationsID, growthsID, productionsID} ),
            headers: {'Content-Type': 'application/json'}
        })

        if(response.ok) {
            loadLocationDetails();
            resetForm();
            alert("New Location Details Added!");
        }else{
            console.error('Failed to create new Location Details entry');
        }
    }


    //Send GET request to obtain current information on selected entry and enter edit mode
    const editLocationDetails = async (locationDetailsID) => {
        resetForm();
        if (edit){
             setEdit(false)
        } else{
            const response = await fetch(`${URL}/LocationDetails/${locationDetailsID}`);
            if (response.ok) {
                const locationDetail = await response.json();
                setLocationsID(locationDetail.growingLocationsID)
                setGrowthsID(locationDetail.growthsID)
                setProductionsID(locationDetail.productionsID)
                setEdit(true);
                setEditLocationDetailsID(locationDetailsID);
            } else {
                console.error(`Failed to fetch Location Details with locationDetailsID = ${locationDetailsID}, status code = ${response.status}`);
            }
        }
    }

    
    //Send PUT request to update selected entry
    const updateLocationDetails = async () =>{
        const response = await fetch(`${URL}/EditLocationDetails/${editLocationDetailsID}`, {
            method: 'PUT',
            body: JSON.stringify({ growthsID, productionsID }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            loadLocationDetails();
            resetForm();
            setEdit(false);
            setEditLocationDetailsID(null);
            alert("Location Details Entry Updated!");
        } else {
            console.error('Failed to update Location Details entry');
        }
    }


    //Send DELETE request on selected entry
    const deleteLocationDetails = async (locationDetailsID) =>{
        const response = await fetch(`${URL}/DeleteLocationDetails/${locationDetailsID}`, { method: 'DELETE' });
        if(response.ok){
            loadLocationDetails();
            alert("Location Details entry removed!");
        } else{
            console.error(`Failed to delete Location Details with locationDetailsID = ${locationDetailsID}, status code = ${response.status}`);
        }
    }


    //Send GET request for all entries of LocationDetails Entity
    const loadLocationDetails = async ()=>{
        const response = await fetch(`${URL}/LocationDetails`);
        const locationDetails = await response.json();
        setLocationDetails(locationDetails);
    }


    //Load Table at first access and after each update
    useEffect(() => {
        loadLocationDetails();
    })


    //Reset State variables contained in form
    const resetForm = () =>{
        setGrowthsID("");
        setProductionsID("");
        setLocationsID("");
    }

    //Navigate form submit to needed operation
    const submitHandler = async(e) =>{
        e.preventDefault();

        if(locationsID === null || (growthsID === null && productionsID === null)){
            alert("A locationID as well as either a growth or production ID required");
            resetForm()
            return;
        }else if( !growthsID  && !productionsID ){
            alert("A Location Details entry should have either a growth or a production ID")
            resetForm()
            return;
        }

        if(edit){
            updateLocationDetails();
        }else{
            addLocationDetails();
        }
    }


    //Fill Table Component
    const customClass = "plantTable"
    const theadData = ["LocationDetailsID", "locationID", "growthsID", "productionsID", "Modify"];

    const tbodyData = locationDetails.map(locationDetail => {  
        return {
            id: locationDetail.locationDetailsID,
            items: [
                locationDetail.locationDetailsID,
                locationDetail.growingLocationsID,
                locationDetail.growthsID,
                locationDetail.productionsID,
                <Buttons key={locationDetail.id} onEditClick={()=> editLocationDetails(locationDetail.locationDetailsID)} onDeleteClick={()=>deleteLocationDetails(locationDetail.locationDetailsID)} />
            ]
        }
    });


    return (
        <main id="LocationDetails">
            <header>
                <h2>LocationDetails</h2>
            </header>
            <div>
            <Table theadData={theadData} tbodyData={tbodyData} customClass={customClass} />
            </div>
            <section >
                <h3>{edit ? "Edit Entry" : "Create New Entry"}</h3>
                <article>
                    <form onSubmit={submitHandler}>
                        <fieldset>
                            {!edit &&(
                                <p>
                                    <label htmlFor="LocationDetails">LocationID  </label>
                                    <LocationsDropDown selectedLocationID={locationsID} setSelectedLocationID={setLocationsID}></LocationsDropDown>
                                </p>
                            )}
                            <p>
                                <label htmlFor="Growth">GrowthID  </label>
                                <GrowthsDropDown selectedGrowthID={growthsID} setSelectedGrowthID={setGrowthsID}></GrowthsDropDown>
                            </p>
                            <p>
                                <label htmlFor="ProductionID">ProductionID  </label>
                                <ProductionsDropDown selectedProductionID={productionsID} setSelectedProductionID={setProductionsID}></ProductionsDropDown>
                            </p>
                            <p>
                                <button className="btn btn-submit" type="submit">{edit ? "Update" : "Submit"}</button>
                            </p>
                        </fieldset>
                    </form>
                </article>
            </section>
        </main>        
    )
}
export default LocationDetails;