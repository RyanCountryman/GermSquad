import React, {useState, useEffect} from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';
import URL from '../config'

function Fertilizers() {
    const [fertilizers, setFertilizers] = useState([]);
    const [edit, setEdit] = useState(false)
    const [editFertilizerID, setEditFertilizerID] = useState(null)
    const [fertilizerType, setFertilizerType] = useState("")
    const [nitrogen, setNitrogen] = useState("")
    const [phosphorous, setPhosphorous] = useState("")
    const [potassium, setPotassium] = useState("")


    //Send POST request to create new Fertilizer Entry
    const addFertilizer = async (e) =>{
        if(!fertilizerType){
            alert("Fertilizer Type is needed to create new entry!");
            resetForm();
            return;
        }
       const response = await fetch(`${URL}/CreateFertilizer`, {
           method: 'POST',
           body: JSON.stringify({ fertilizerType, nitrogen, phosphorous, potassium}),
           headers: {'Content-Type': 'application/json'}
       });

       if(response.ok) {
            alert("New Fertilizer Added!");
           loadFertilizers();
           resetForm();
       }else{
           console.error('Failed to create new fertilizer entry');
       }
   };


    //Send GET request to obtain current information on selected entry and enter edit mode
    const editFertilizer = async (fertilizerID) => {
        resetForm();
        if (edit){
            setEdit(false);
        } else{
            const response = await fetch(`${URL}/Fertilizers/${fertilizerID}`);
            if (response.ok) {
                const fertilizer = await response.json();
                setFertilizerType(fertilizer.fertilizerType)
                setNitrogen(fertilizer.nitrogen)
                setPhosphorous(fertilizer.phosphorous)
                setPotassium(fertilizer.potassium)
                setEdit(true);
                setEditFertilizerID(fertilizerID);
            } else {
                console.error(`Failed to fetch Fertilizer with fertilizerID = ${fertilizerID}, status code = ${response.status}`);
            }
        }
    };


    //Send PUT request to update selected entry
    const updateFertilizer = async () =>{
        const response = await fetch(`${URL}/EditFertilizer/${editFertilizerID}`, {
            method: 'PUT',
            body: JSON.stringify({ fertilizerType, nitrogen, phosphorous, potassium }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            loadFertilizers();
            resetForm();
            setEdit(false);
            setEditFertilizerID(null);
            alert("Fertilizer Entry Updated!");
        } else {
            console.error('Failed to update Fertilizer entry');
        }
    };


    //Send DELETE request on selected entry
    const deleteFertilizer = async (fertilizerID) =>{
        const response = await fetch(`${URL}/DeleteFertilizer/${fertilizerID}`, { method: 'DELETE' });
        if(response.ok){
            alert("Fertilizer entry removed!");
            loadFertilizers();
        } else{
            console.error(`Failed to delete Fertilizer with fertilizerID = ${fertilizerID}, status code = ${response.status}`);
        }
    };


    //Send GET request for all entries of Fertilizers Entity
    const loadFertilizers = async ()=>{
        const response = await fetch(`${URL}/Fertilizers`);
        const fertilizers = await response.json();
        setFertilizers(fertilizers);
    }

    //Load Table at first access and after each update
    useEffect(() => {
        loadFertilizers();
    }, []);


    //Reset State variables contained in form
    const resetForm = () =>{
        setFertilizerType("")
        setNitrogen("")
        setPhosphorous("")
        setPotassium("")
    }


    //Navigate form submit to needed operation
    const submitHandler = async(e) =>{
        e.preventDefault();

        if(edit){
            updateFertilizer()
        }else{
            addFertilizer()
        }
    }


    //Fill Table Component
    const customClass = "plantTable"
    const theadData = ["Fertilizer ID", "Fertilizer Type", "Nitrogen", "Phosphorous", "Potassium", "Modify"];

    const tbodyData = fertilizers.map(fertilizer => {  
        return {
            id: fertilizer.fertilizerID,
            items: [
                fertilizer.fertilizerID,
                fertilizer.fertilizerType,
                fertilizer.nitrogen,
                fertilizer.phosphorous,
                fertilizer.potassium,
                <Buttons key={fertilizer.id}  onEditClick={()=> editFertilizer(fertilizer.fertilizerID)} onDeleteClick={()=> deleteFertilizer(fertilizer.fertilizerID)} />
            ]
        }
    });


    return (
        <body>
        <header>
            <h2>Fertilizer Page</h2>
        </header>
        <main id="Fertilizers">
            <div>
                <Table theadData={theadData} tbodyData={tbodyData} customClass={customClass} />
            </div>
            <section >
                <h3>{edit ?  "Edit Fertilizer" : "Create New Entry"}</h3>
                <article>
                    <form onSubmit={submitHandler}>
                        <fieldset>
                            <legend>{edit ?  "Edit Entry" : "New Fertilizer"}</legend>
                            <p>
                                <label htmlFor="Fertilizer">Fertilizer Type </label>
                                <input type="text" name="Fertilizer" id="Fertilizer" value={fertilizerType} onChange={(e)=> setFertilizerType(e.target.value)}/>
                            </p>
                            <p>
                                <label htmlFor="Nitrogen">Nitrogen </label>
                                <input type="number" name="Nitrogen" id="Nitrogen" value={nitrogen} onChange={(e)=> setNitrogen(e.target.value)}/> 
                            </p>
                            <p>
                                <label htmlFor="Phosphorous">Phosphorous </label>
                                <input type="number" name="Phosphorous" id="Phosphorous" value={phosphorous} onChange={(e)=> setPhosphorous(e.target.value)}/> 
                            </p>
                            <p>
                                <label htmlFor="Potassium">Potassium </label>
                                <input type="number" name="Potassium" id="Potassium" value={potassium} onChange={(e)=> setPotassium(e.target.value)}/> 
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
export default Fertilizers;