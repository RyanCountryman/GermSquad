import React from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';

function Growths() {
    const customClass = "plantTable"
    const theadData = ["Growth ID", "Plant ID", "Plant Name", "Start Date", "Daily Sunlight Needed", "Water Frequency", "Fertilizer Frequency", "Modify"];

    const tbodyData = [
        {
            id: "1",
            items: ["1", "1", "Tomato", "05/15/2024", "14 Hours", "Every 1 Days", "Every 3 Days", Buttons()],
            
            
        },
        {
            id: "2",
            items: ["2", "2", "Pepper", "04/15/2024", "16 Hours", "Every 2 Days", "Every 4 Days", Buttons()],
        },
        {
            id: "3",
            items: ["3", "3", "Cucumber", "04/15/2024", "10 Hours", "Every 1 Days", "Every 7 Days", Buttons()],
        },
    ];
    return (
        <body>
        <header>
            <h1>Growths Page</h1>
        </header>
        <main id="Growths">
            <div>
                <Table theadData={theadData} tbodyData={tbodyData} customClass={customClass} />
            </div>
            <section >
                <h2>Create New Entry</h2>
                <article>
                    <p>Which plant is this?</p>
                    <form action="/Growths" method="POST">
                        <fieldset>
                            <legend>Growth</legend>
                            <p>
                                <label for="Growth">Plant Type</label>
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
                            <label for="Growth">Which one?</label>
                                <select name = "plantType" id="plantType">
                                    <option value="ID 1">ID 1</option>
                                    <option value="ID 2">ID 2</option>
                                    <option value="ID 3">ID 3</option>
                                </select>
                            </p>
                            <p>
                                <label for="startDate">Start Date</label>
                                <input type="Date"/>
                            </p>
                            <p>
                                <label for="waterFreq">Water Frequency (Days)</label>
                                <input type="number"/>
                            </p>
                            <p>
                                <label for="fertFreq">Fertilizer Frequency (Days)</label>
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
        <footer>
            <p>&copy; 2024 Germ Squad</p> 
        </footer>
    </body> 
        
    )
}
export default Growths;