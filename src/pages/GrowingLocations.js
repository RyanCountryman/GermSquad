import React from 'react';

function GrowingLocations() {
    return (
        <body>
            <header>
                <h1>Growing Locations Page</h1>
            </header>
            <main id="GrowingLoc">
                <section>
                    <table id="planttable">
                        <tr>
                            <th>Location ID</th>
                            <th>In Ground?</th>
                            <th>In Container?</th>
                            <th>Bed Type</th>
                            <th>Container Type</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Yes</td>
                            <td>No</td>
                            <td>Trellised Raised Bed</td>
                            <td>NA</td>
                            <button class= "btn btn-edit">Edit</button>
                            <button class= "btn btn-delete">Delete</button>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>No</td>
                            <td>Yes</td>
                            <td>NA</td>
                            <td>5 Gallon Ceramic Pot</td>
                            <button class= "btn btn-edit">Edit</button>
                            <button class= "btn btn-delete">Delete</button>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Yes</td>
                            <td>No</td>
                            <td>Garden Row</td>
                            <td>NA</td>
                            <button class= "btn btn-edit">Edit</button>
                            <button class= "btn btn-delete">Delete</button>
                        </tr>
                    </table>
                </section>
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