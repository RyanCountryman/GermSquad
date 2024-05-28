import React, {useState, useEffect} from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';

function LocationDetails() {
    const [locationDetails, setLocationDetails] = useState([]);

    const customClass = "plantTable"
    const theadData = ["LocationDetailsID", "locationID", "growthsID", "productionsID", "Modify"];


    const tbodyData = locationDetails.map(locationDetail => {  
        return {
            id: locationDetail.locationDetailsID,
            items: [
                locationDetail.locationDetailsID, //TODO ADD IN CONDITIONALS IF NEEDED FOR DISPLAY
                locationDetail.growingLocationsID,
                locationDetail.growthsID,
                locationDetail.productionsID,
                <Buttons key={locationDetail.id} />
            ]
        }
    });

    const loadLocationDetails = async ()=>{
        const response = await fetch('http://localhost:8500/LocationDetails'); //TODO Change Fetch url
        const locationDetails = await response.json();
        setLocationDetails(locationDetails);
    }

    useEffect(() => {
        loadLocationDetails();
    })

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