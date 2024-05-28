import React, {useState, useEffect} from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';

function GrowingLocations() {
    const [growingLocations, setGrowingLocations] = useState([]);

    const customClass = "plantTable"
    const theadData = ["Location ID", "In Ground?", "In Container?", "Bed Type", "Container Type", "Modify"];


    const tbodyData = growingLocations.map(growingLocation => {  
        return {
            id: growingLocation.locationID,
            items: [
                growingLocation.locationID,
                growingLocation.isGround,
                growingLocation.isContainer,
                growingLocation.isGround ? growingLocation.bedType : "NA",
                growingLocation.isContainer? growingLocation.containerType : "NA",
                <Buttons key={growingLocation.id} />
            ]
        }
    });


    const loadGrowingLocations = async ()=>{
        const response = await fetch('http://localhost:8500/GrowingLocations'); //TODO Change Fetch url
        const growingLocations = await response.json();
        setGrowingLocations(growingLocations);
    }

    useEffect(() => {
        loadGrowingLocations();
    })

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
                    <h3>Create New Growing Location</h3>
                    <article>
                        <form action="/GrowingLocations" method="POST">
                            <fieldset>
                                <legend>New Growing Location</legend>
                                <p>
                                    <label for="location">Location Type </label>
                                    <select name = "locationType" id="locationType">
                                        <option value="ground">Ground</option>
                                        <option value="container">Container</option>
                                    </select>
                                </p>
                                <p>
                                    <label for="bedType">Type of bed </label>
                                    <input type="text"/>
                                </p>
                                <p>
                                    <label for="containerType">Type of container </label>
                                    <input type="text"/>
                                </p>
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
export default GrowingLocations;