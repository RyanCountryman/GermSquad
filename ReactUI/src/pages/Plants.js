import React, {useState, useEffect} from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';
//import axios from 'axios';


function Plants() {
    const [plants, setPlants] = useState([]);
    

    const addPlant = async (event) =>{
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        const plantType = formData.get('plantType');
        const plantName = formData.get('plantName');

        if((plantType && plantName) || (!plantType && !plantName)){
            alert('Please fill in either plantType from the dropdown or enter a new plant type');
            return;
        }

        const response = await fetch('http://localhost:8500/CreatePlant', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: {'Content-Type': 'application/json'}
        });

        if(response.ok) {
            loadPlants();
            form.reset();
        }else{
            console.error('Failed to create new plant entry');
        }

    };

    const deletePlant = async (plantID) =>{
        const response = await fetch(`http://localhost:8500/DeletePlant/${plantID}`, { method: 'DELETE' });
        if(response.ok){
            loadPlants();
        } else{
            console.error(`Failed to delete Plant with plantID = ${plantID}, status code = ${response.status}`);
        }
    };
    
    
    const customClass = "plantTable"
    const theadData = ["Plant ID", "Plant Name", "Season Completed", "Modify"];

    const tbodyData = plants.map(plant => ({
        id: plant.plantID,
        items: [
            plant.plantID,
            plant.plantType,
            plant.seasonComplete ? "Yes" : "No",
            <Buttons key={plant.id}  onDeleteClick={() => deletePlant(plant.plantID)} />
        ]
    }));



    const loadPlants = async ()=>{
        const response = await fetch('http://localhost:8500/Plants'); //TODO Change Fetch url
        const plants = await response.json();
        setPlants(plants);
    }

    useEffect(() => {
        loadPlants();
    })
    return (
        <body>
            <header>
                <h2>Plants Home Page</h2>
            </header>
            <main id="Plants">
                <div>
                    <Table theadData={theadData} tbodyData={tbodyData} customClass={customClass} />
                </div>
                    
                <section >
                    <h3>Create New Entry</h3>
                    <article>
                        <h5>What are you planting?</h5>
                        <form onSubmit={addPlant}>
                            <fieldset>
                                <legend>New Plant</legend>
                                <p>
                                    <label htmlFor="plantType">Plant Type </label>
                                    <select name = "plantType" id="plantType">
                                        <option value=""></option>
                                        <option value="Tomato">Tomato</option>
                                        <option value="Pepper">Pepper</option>
                                        <option value="Lettuce">Lettuce</option>
                                        <option value="Cucumber">Cucumber</option>
                                        <option value="Squash">Squash</option>
                                        <option value="Oregano">Oregano</option>
                                        <option value="Basil">Basil</option>
                                        <option value="Potato">Potato</option>
                                    </select>
                                </p>
                                <div>
                                    <label htmlFor="plantName">Enter Plant Name </label>
                                    <input type="text" name="plantName" id="plantName"/>
                                </div>
                                <div>
                                    <label>Season Complete</label>

                                    <input type="radio" name="seasonComplete" id="seasonComplete" value={1}/>
                                    <label htmlFor="seasonComplete">Yes</label>

                                    <input type="radio" name="seasonComplete" id="seasonNotComplete" value={0}/>
                                    <label htmlFor="seasonNotComplete">No</label>
                                </div>
                                <p>
                                    <button class="btn btn-submit">Submit</button>
                                </p>
                            </fieldset>
                        </form>
                    </article>
                </section>
            </main>   
    </body> 
    )
}
export default Plants;