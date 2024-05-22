import React from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';

function LocationDetails() {
    const customClass = "plantTable"
    const theadData = ["LocationDetailsID", "locationID", "growthsID", "productionsID", "Modify"];

    const tbodyData = [
        {
            id: "1",
            items: ["1", "4", "1","1", Buttons()],
        },
        {
            id: "2",
            items: ["2", "5", "2","2", Buttons()],
        },
        {
            id: "3",
            items: ["3", "1", "3","3", Buttons()],
        },
        {
            id: "4",
            items: ["4", "3", "4","4", Buttons()],
        }
    ];
    return (
        <body>
        <header>
            <h2>LocationDetails</h2>
        </header>
        <main id="LocationDetails">
            <div>
            <Table theadData={theadData} tbodyData={tbodyData} customClass={customClass} />
            </div>
            <section >
                <h3>Create New LocationDetails</h3>
                <article>
                    <form action="/LocationDetails" method="POST">
                        <fieldset>
                            <legend>New Location Details</legend>
                            <p>
                                <label for="LocationDetails">LocationID  </label>
                                <select name = "GrowingLocationID" id="locationID">
                                    <option value="NULL"></option>
                                    <option value="1">inGround, Raised Bed</option>
                                    <option value="2">inGround, Row</option>
                                    <option value="3">inGround, Trellised Bed</option>
                                    <option value="4">inContainer, Ceramic 3 Gal</option>
                                    <option value="5">inContainer, Cloth 5 Gal</option>
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
export default LocationDetails;