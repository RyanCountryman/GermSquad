import React, {useState, useEffect} from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';
import PlantsDropDown from '../components/PlantsDropdown'


function Seedlings() {
    const [seedlings, setSeedlings] = useState([]);
    const customClass = "plantTable"
    const theadData = ["Seedling ID", "Plant ID", "Plant Name", "Date Planted", "Soil Temperature", "Water Frequency", "Days to germinate", "Modify"];

    const tbodyData = seedlings.map(seedling => {
        const datePlanted = new Date(seedling.datePlanted);
        return {
            id: seedling.seedlingID,
            items: [
                seedling.seedlingID,
                seedling.plantID,
                seedling.plantType,
                datePlanted.toLocaleDateString(),
                seedling.aveTemperature,
                `Every ${seedling.waterFrequency} Days`,
                seedling.germinationTime,
                <Buttons key={seedling.id} />
            ]
        }
    });

    const loadSeedlings = async ()=>{
        const response = await fetch('http://localhost:8500/Seedlings'); //TODO Change Fetch url
        const seedlings = await response.json();
        setSeedlings(seedlings);
    }

    useEffect(() => {
        loadSeedlings();
    })




    return (
        <body>
            <header>
                <h2>Seedlings Page</h2>
            </header>
            <main id="Seedlings">
                <div>
                    <Table theadData={theadData} tbodyData={tbodyData} customClass={customClass} />
                </div>
                <section >
                    <h3>Create New Entry</h3>
                    <article>
                        <h5>What are you planting?</h5>
                        <form action="/Seedlings" method="POST">
                            <fieldset> 
                                <legend>New Plant</legend>
                                <p>
                                    <label for="seedling">Plant Type </label>
                                    <PlantsDropDown></PlantsDropDown>
                                </p>
                                <p>
                                    <label for="plantingdate">Date Planted </label>
                                    <input type="Date"/>
                                </p>
                                <p>
                                    <label for="temperature">Soil Temperature(Degrees F) </label>
                                    <input type="number"/>
                                </p>
                                <p>
                                    <label for="waterFreq">Water Frequency (Days) </label>
                                    <input type="number"/>
                                </p>
                                <p>
                                    <label for="germinationTime">Days to Germinate </label>
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
export default Seedlings;