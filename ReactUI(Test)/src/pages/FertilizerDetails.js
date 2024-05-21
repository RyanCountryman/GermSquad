import React from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';

function FertilizerDetails() {
    const customClass = "plantTable"
    const theadData = ["FertilizerDetailsID", "FertilizerID", "GrowthID", "ProductionID", "Modify"];

    const tbodyData = [
        {
            id: "1",
            items: ["1","2", "1", "1", Buttons()],
        },
        {
            id: "2",
            items: ["2","3", "2", "2", Buttons()],
        },
        {
            id: "3",
            items: ["3","1", "3", "3", Buttons()],
        }
    ];
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