import React, {useState, useEffect} from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';
import URL from '../config'
import GrowthsDropDown from '../components/GrowthsDropdown';
import ProductionsDropDown from '../components/ProductionsDropdown';
import FertilizersDropDown from '../components/FertilizersDropdown';

function FertilizerDetails() {
    const [fertilizerDetails, setFetilizerDetails] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editFertilzerDetailsID, setEditFertilizerDetailsID] = useState(null);
    const [fertilizerID, setFertilizerID] = useState(null);
    const [growthsID, setGrowthsID] = useState(null);
    const [productionsID, setProductionsID] = useState(null);
    

    //Send POST request to create new FertilizerDetails Entry
    const addFertilizerDetails = async (e) =>{
        const response = await fetch(`${URL}/CreateFertilizerDetails`, {
            method: 'POST',
            body: JSON.stringify({ fertilizerID, growthsID, productionsID} ),
            headers: {'Content-Type': 'application/json'}
        })

        if(response.ok) {
            alert("New FertilizerDetails Added!");
            loadFertilzerDetails();
            resetForm();
        }else{
            console.error('Failed to create new fertilizerDetails entry');
        }
    }


    //Send GET request to obtain current information on selected entry and enter edit mode
    const editFertilizerDetails = async (detailsID) => {
        resetForm();
        if (edit){
             setEdit(false)
        } else{
            const response = await fetch(`${URL}/FertilizerDetails/${detailsID}`);
            if (response.ok) {
                const fertilizerDetail = await response.json();
                setFertilizerID(fertilizerDetail.fertilizerID)
                setGrowthsID(fertilizerDetail.growthsID)
                setProductionsID(fertilizerDetail.productionsID)
                setEdit(true);
                setEditFertilizerDetailsID(detailsID);
            } else {
                console.error(`Failed to fetch FertilizerDetails with detailsID = ${detailsID}, status code = ${response.status}`);
            }
        }
    }


    //Send PUT request to update selected entry
    const updateFertilizerDetails = async () =>{       
        const response = await fetch(`${URL}/EditFertilizerDetails/${editFertilzerDetailsID}`, {
            method: 'PUT',
            body: JSON.stringify({ growthsID, productionsID }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            loadFertilzerDetails();
            resetForm();
            setEdit(false);
            setEditFertilizerDetailsID(null);
            alert("FertilizerDetails Entry Updated!");
        } else {
            console.error('Failed to update FertilizerDetails entry');
        }
    }

    
    //Send DELETE request on selected entry
    const deleteFertilizerDetails = async (detailsID) =>{
        const response = await fetch(`${URL}/DeleteFertilizerDetails/${detailsID}`, { method: 'DELETE' });
        if(response.ok){
            alert("FertilizerDetails entry removed!");
            loadFertilzerDetails();
        } else{
            console.error(`Failed to delete FertilizerDetails with detailsID = ${detailsID}, status code = ${response.status}`);
        }
    }


    //Send GET request for all entries of FertilizerDetails Entity
    const loadFertilzerDetails = async ()=>{
        const response = await fetch(`${URL}/FertilizerDetails`);
        const fertilizerDetails = await response.json();
        setFetilizerDetails(fertilizerDetails);
    }


    //Load Table at first access and after each update
    useEffect(() => {
        loadFertilzerDetails();
    })


    //Reset State variables contained in form
    const resetForm = () =>{
        setGrowthsID("");
        setProductionsID("");
        setFertilizerID("");
    }


    //Navigate form submit to needed operation
    const submitHandler = async(e) =>{
        e.preventDefault();

        if(fertilizerID === null || (growthsID === null && productionsID === null)){
            alert("A fertilizerID as well as either a growth or production ID required")
            resetForm()
            return;
        }else if( !growthsID  && !productionsID){
            alert("A FertilizerDetails entry should have either a growth or a production ID")
            resetForm()
            return;
        }
        
        if(edit){
            updateFertilizerDetails();
        }else{
            addFertilizerDetails();
        }
    }


    //Fill Table Component
    const customClass = "plantTable"
    const theadData = ["FertilizerDetailsID", "FertilizerID", "GrowthID", "ProductionID", "Modify"];

    const tbodyData = fertilizerDetails.map(fertilizerDetail => {  
        return {
            id: fertilizerDetail.detailsID,
            items: [
                fertilizerDetail.detailsID,
                fertilizerDetail.fertilizerID,
                fertilizerDetail.growthsID,
                fertilizerDetail.productionsID,
                <Buttons key={fertilizerDetail.id} onEditClick={()=>editFertilizerDetails(fertilizerDetail.detailsID)} onDeleteClick={()=> deleteFertilizerDetails(fertilizerDetail.detailsID)} />
            ]
        }
    });


    return (
        <body>
        <header>
            <h2>FertilizerDetails</h2>
        </header>
        <main id="FertilizerDetails">
            <div>
            <Table theadData={theadData} tbodyData={tbodyData} customClass={customClass} />
            </div>
            <section >
                <h3>{edit ? "Edit Entry" : "Create New Entry"}</h3>
                <article>
                    <form onSubmit={submitHandler}>
                        <fieldset>
                            <legend>{edit ? "Edit Entry" : "New Fertilizer Details"}</legend>
                            {!edit &&(
                                <p>
                                    <label htmlFor="FertilizerDetails">Fertilizer  </label>
                                    <FertilizersDropDown selectedFertilizerID={fertilizerID} setSelectedFertilizerID={setFertilizerID}></FertilizersDropDown>
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
    </body>     
    )
}
export default FertilizerDetails;