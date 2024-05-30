import React, {useState, useEffect} from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';

function FertilizerDetails() {
    const [fertilizerDetails, setFetilizerDetails] = useState([]);

    const customClass = "plantTable"
    const theadData = ["FertilizerDetailsID", "FertilizerID", "GrowthID", "ProductionID", "Modify"];


    const tbodyData = fertilizerDetails.map(fertilizerDetail => {  
        return {
            id: fertilizerDetail.detailsID,
            items: [
                fertilizerDetail.detailsID, //TODO ADD IN CONDITIONALS IF NEEDED FOR DISPLAY
                fertilizerDetail.fertilizerID,
                fertilizerDetail.growthsID,
                fertilizerDetail.productionsID,
                <Buttons key={fertilizerDetail.id} />
            ]
        }
    });

    const loadFertilzerDetails = async ()=>{
        const response = await fetch('http://localhost:8500/FertilizerDetails'); //TODO Change Fetch url
        const fertilizerDetails = await response.json();
        setFetilizerDetails(fertilizerDetails);
    }

    useEffect(() => {
        loadFertilzerDetails();
    })

    return (
        <body>
        <header>
            <h2>FertilizerDetails</h2>
        </header>
        <main id="FertilizerDetails">
            <div>
            <Table theadData={theadData} tbodyData={tbodyData} customClass={customClass} />
            </div>
            <section >
                <h3>Create New FertilizerDetails</h3>
                <article>
                    <form action="/FertilizerDetails" method="POST">
                        <fieldset>
                            <legend>New Fertilizer Details</legend>
                            <p>
                                <label for="FertilizerDetails">Fertilizer  </label>
                                <select name = "fertilizerType" id="fertilizerType">
                                    <option value="NULL"></option>
                                    <option value="1">Liquid Big Bloom</option>
                                    <option value="2">Liquid Grow Big</option>
                                    <option value="3">Liquid Tiger's Blood</option>
                                </select>
                            </p>
                            <p>
                                <label for="Growth">GrowthID  </label>
                                    <select name = "growthsID" id="growthsID">
                                        <option value="NULL"></option>
                                        <option value="1">ID 1 - Cherry Tomato</option>
                                        <option value="2">ID 2 -Chocolate Seven Pot Pepper</option>
                                        <option value="3">ID 3 -Honey Nut Squash</option>
                                        <option value="4">ID 4 -English Cucumber</option>
                                    </select>
                            </p>
                            <p>
                                <label for="ProductionID">ProductionID  </label>
                                    <select name = "productionsID" id="productionsID">
                                        <option value="NULL"></option>
                                        <option value="1">ID 1 - Cherry Tomato</option>
                                        <option value="2">ID 2 -Chocolate Seven Pot Pepper</option>
                                        <option value="3">ID 3 -Honey Nut Squash</option>
                                        <option value="4">ID 4 -English Cucumber</option>
                                    </select>
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
export default FertilizerDetails;