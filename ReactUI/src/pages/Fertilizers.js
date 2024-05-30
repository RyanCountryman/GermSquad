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

    //Add new fertilizer entry to table
    const addFertilizer = async (e) =>{
       const response = await fetch(`${URL}/CreateFertilizer`, {
           method: 'POST',
           body: JSON.stringify({ fertilizerType, nitrogen, phosphorous, potassium}),
           headers: {'Content-Type': 'application/json'}
       });

       if(response.ok) {
           loadFertilizers();
           resetForm();
       }else{
           console.error('Failed to create new fertilizer entry');
       }
   };


    //GET Fertilizer attribute values by ID and store for edit
    const editFertilizer = async (fertilizerID) => {
        console.log("WE HERE FROM EDIT")
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

    //Update selected ID with changed values in form
    const updateFertilizer = async () =>{
        const response = await fetch(`${URL}/EditFertilizers/${editFertilizerID}`, {
            method: 'PUT',
            body: JSON.stringify({ fertilizerType, nitrogen, phosphorous, potassium }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            loadFertilizers();
            resetForm();
            setEdit(false);
            setEditFertilizerID(null);
        } else {
            console.error('Failed to update Fertilizer entry');
        }
    };


    //Delete existing fertilizer entry from table
   const deleteFertilizer = async (fertilizerID) =>{
    const response = await fetch(`${URL}/DeleteFertilizer/${fertilizerID}`, { method: 'DELETE' });
    if(response.ok){
        loadFertilizers();
    } else{
        console.error(`Failed to delete Fertilizer with fertilizerID = ${fertilizerID}, status code = ${response.status}`);
    }
};

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


    const loadFertilizers = async ()=>{
        const response = await fetch(`${URL}/Fertilizers`);
        const fertilizers = await response.json();
        setFertilizers(fertilizers);
    }

    const resetForm = () =>{
        setFertilizerType("")
        setNitrogen("")
        setPhosphorous("")
        setPotassium("")
    }

    useEffect(() => {
        loadFertilizers();
    }, []);

    const submitHandler = async(e) =>{
        e.preventDefault();
        if(edit){
            updateFertilizer()
        }else{
            addFertilizer()
        }
    }


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