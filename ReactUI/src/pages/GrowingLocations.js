import React, {useState, useEffect} from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';

function GrowingLocations() {
    const [growingLocations, setGrowingLocations] = useState([]);

    const customClass = "plantTable"
    const theadData = ["Location ID", "In Ground?", "In Container?", "Bed Type", "Container Type", "Modify"];

    const tbodyData = [
        {
            id: "1",
            items: ["1", "Yes", "No", "Trellised Raised Bed", "NA", <Buttons key={growingLocations.id} />],    
        },
        {
            id: "2",
            items: ["2", "No", "Yes", "NA", "5 Gallon Ceramic Pot", <Buttons key={growingLocations.id} />],
        },
        {
            id: "3",
            items: ["3", "Yes", "No", "Garden Row", "NA", <Buttons key={growingLocations.id} />]
        },
    ];
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