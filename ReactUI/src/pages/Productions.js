import React, {useState, useEffect} from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';
import PlantsDropDown from '../components/PlantsDropdown'

function Productions() {
    const [productions, setProductions] = useState([]);
    // Fill Productions Table
    const customClass = "plantTable"
    const theadData = ["Production ID", "Plant ID", "Plant Name", "Start Date", "End Production Date", "Water Frequency", "Fertilizer Frequency", "Total Yield","Fertilizer","Location", "Modify"];

    const tbodyData = productions.map(production => {
        const dateStarted = new Date(production.startDate);
        const dateEnded = new Date(production.endProduction);
        const growLocation = production.isGround ? production.bedType : production.containerType;  
        return {
            id: production.productionID,
            items: [
                production.productionID,
                production.plantID,
                production.plantType,
                dateStarted.toLocaleDateString(),
                dateEnded.toLocaleDateString(),
                `Every ${production.waterFrequency} Days`,
                `Every ${production.fertilizerFrequency} Days`,
                `${production.yield} Pounds`,
                production.fertilizerType,
                growLocation,
                <Buttons key={production.id} />
            ]
        }
    });
    const loadProductions = async ()=>{
        const response = await fetch('http://localhost:8500/Productions'); //TODO Change Fetch url
        const productions = await response.json();
        setProductions(productions);
    }

    useEffect(() => {
        loadProductions();
    })


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
                                    <label for="endProduction">Production End Date </label>
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
                                    <label for="yield">Yield (Pounds) </label>
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