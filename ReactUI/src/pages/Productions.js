import React, {useState, useEffect} from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';

function Productions() {
    const [productions, setProductions] = useState([]);

    const customClass = "plantTable"
    const theadData = ["Production ID", "Plant ID", "Plant Name", "Start Date", "End Production Date", "Water Frequency", "Fertilizer Frequency", "Total Yield","Fertilizer","Location", "Modify"];

    const tbodyData = [
        {
            id: "1",
            items: ["1", "1", "Tomato", "06/15/2024", "09/15/2024", "Every 1 Days", "Every 5 Days", "10 Pounds","Liquid Grow Big","Ceramic 3 Gal", <Buttons key={productions.id} />],
            
            
        },
        {
            id: "2",
            items: ["2", "2", "Pepper", "07/15/2024", "NA", "Every 2 Days", "Every 7 Days", "NA","Liquid Tiger's Blood","Ceramic 5 Gal", <Buttons key={productions.id} />],
        },
        {
            id: "3",
            items: ["3", "3", "Cucumber", "05/15/2024", "10/15/2024", "Every 1 Days", "Every 7 Days", "20 Pounds","Liquid Big Bloom","Raised Bed", <Buttons key={productions.id} />],
        }
    ];
    return (
        <body>
            <header>
                <h2>Productions Page</h2>
            </header>
            <main id="Productions">
                <div>
                    <Table theadData={theadData} tbodyData={tbodyData} customClass={customClass} />
                </div>
                <section >
                    <h3>Create New Entry</h3>
                    <article>
                        <h5>Which plant is this?</h5>
                        <form action="/Productions" method="POST">
                            <fieldset>
                                <legend>New Production</legend>
                                <p>
                                    <label for="Production">Plant Type </label>
                                    <select name = "plantType" id="plantType">
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
                                <p>
                                <label for="Growth">Which one? </label>
                                    <select name = "plantType" id="plantType">
                                        <option value="ID 1">ID 1</option>
                                        <option value="ID 2">ID 2</option>
                                        <option value="ID 3">ID 3</option>
                                    </select>
                                </p>
                                <p>
                                    <label for="startDate">Start Date </label>
                                    <input type="Date"/>
                                </p>
                                <p>
                                    <label for="waterFreq">Water Frequency (Days) </label>
                                    <input type="number"/>
                                </p>
                                <p>
                                    <label for="fertFreq">Fertilizer Frequency (Days) </label>
                                    <input type="number"/>
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
export default Productions;