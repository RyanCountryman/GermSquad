import React from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';

function GrowingLocations() {
    const customClass = "plantTable"
    const theadData = ["Location ID", "In Ground?", "In Container?", "Bed Type", "Container Type", "Modify"];

    const tbodyData = [
        {
            id: "1",
            items: ["1", "Yes", "No", "Trellised Raised Bed", "NA", Buttons()],    
        },
        {
            id: "2",
            items: ["2", "No", "Yes", "NA", "5 Gallon Ceramic Pot", Buttons()],
        },
        {
            id: "3",
            items: ["3", "Yes", "No", "Garden Row", "NA", Buttons()],
        },
    ];
    return (
        <body>
            <header>
                <h1>Growing Locations Page</h1>
            </header>
            <main id="GrowingLoc">
                <div>
                    <Table theadData={theadData} tbodyData={tbodyData} customClass={customClass} />
                </div>
                <section >
                    <h2>Create New Growing Location</h2>
                    <article>
                        <form action="/GrowingLocations" method="POST">
                            <fieldset>
                                <legend>Growing Location</legend>
                                <p>
                                    <label for="location">Location Type</label>
                                    <select name = "locationType" id="locationType">
                                        <option value="ground">Ground</option>
                                        <option value="container">Container</option>
                                    </select>
                                </p>
                                <p>
                                    <label for="bedType">Type of bed</label>
                                    <input type="text"/>
                                </p>
                                <p>
                                    <label for="containerType">Type of container</label>
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
        <footer>
            <p>&copy; 2024 Germ Squad</p> 
        </footer>
    </body> 
    )
}
export default GrowingLocations;