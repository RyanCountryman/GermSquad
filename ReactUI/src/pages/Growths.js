import React, {useState, useEffect} from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';
import PlantsDropDown from '../components/PlantsDropdown'

function Growths() {
    const [growths, setGrowths] = useState([]);

    // Fill Growths Table
    const customClass = "plantTable"
    const theadData = ["Growth ID", "Plant ID", "Plant Name", "Start Date", "Daily Sunlight Needed", "Water Frequency", "Fertilizer Frequency","Fertilizer","Location", "Modify"];

    const tbodyData = growths.map(growth => {
        const datePlanted = new Date(growth.startDate);
        const growLocation = growth.isGround ? growth.bedType : growth.containerType;  
        return {
            id: growth.growthID,
            items: [
                growth.growthID,
                growth.plantID,
                growth.plantType,
                datePlanted.toLocaleDateString(),
                `${growth.dailySunlight} Hours`,
                `Every ${growth.waterFrequency} Days`,
                `Every ${growth.fertilizerFrequency} Days`,
                growth.fertilizerType,
                growLocation,
                <Buttons key={growth.id} />
            ]
        }
    });


    const loadGrowths = async ()=>{
        const response = await fetch('http://localhost:8500/Growths'); //TODO Change Fetch url
        const growths = await response.json();
        setGrowths(growths);
    }

    useEffect(() => {
        loadGrowths();
    })


    return (
        <body>
        <header>
            <h2>Growths Page</h2>
        </header>
        <main id="Growths">
            <div>
                <Table theadData={theadData} tbodyData={tbodyData} customClass={customClass} />
            </div>
            <section >
                <h3>Create New Entry</h3>
                <article>
                    <h5>Which plant is this?</h5>
                    <form action="/Growths" method="POST">
                        <fieldset>
                            <legend>New Growth</legend>
                            <p>
                                <label for="Growth">Plant Type </label>
                                <PlantsDropDown></PlantsDropDown>
                            </p>
                            <p>
                                <label for="startDate">Start Date </label>
                                <input type="Date"/>
                            </p>
                            <p>
                                <label for="dailySunlight">Daily Sunlight Needed (Hours) </label>
                                <input type="number"/>
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
export default Growths;