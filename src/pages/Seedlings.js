import React from 'react';

function Seedlings() {
    return (
        <body>
            <header>
                <h1>Seedlings Page</h1>
            </header>
            <main id="Seedlings">
                <section>
                    <table id="planttable">
                        <tr>
                            <th>Seedling ID</th>
                            <th>Plant ID</th>
                            <th>Plant Name</th>
                            <th>Date Planted</th>
                            <th>Soil Temperature</th>
                            <th>Water Frequency</th>
                            <th>Days to germinate</th>

                        </tr>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>Tomato</td>
                            <td>05/01/2024</td>
                            <td>70F</td>
                            <td>Every 2 Days</td>
                            <td>10</td>
                            <button class= "btn btn-edit">Edit</button>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>2</td>
                            <td>Pepper</td>
                            <td>04/01/2024</td>
                            <td>80F</td>
                            <td>Every 3 Days</td>
                            <td>6</td>
                            <button class= "btn btn-edit">Edit</button>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>3</td>
                            <td>Cucumber</td>
                            <td>04/10/2024</td>
                            <td>65F</td>
                            <td>Every 1 Days</td>
                            <td>3</td>
                            <button class= "btn btn-edit">Edit</button>
                        </tr>

                    </table>
                </section>
                <section >
                    <h2>Create New Entry</h2>
                    <article>
                        <p>What are you planting?</p>
                        <form action="/Seedlings" method="POST">
                            <fieldset>
                                <legend>New Plant</legend>
                                <p>
                                    <label for="seedling">Plant Type</label>
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
                                    <label for="plantingdate">Date Planted</label>
                                    <input type="Date"/>
                                </p>
                                <p>
                                    <label for="temperature">Soil Temperature(Degrees F)</label>
                                    <input type="number"/>
                                </p>
                                <p>
                                    <label for="waterFreq">Water Frequency (Days)</label>
                                    <input type="number"/>
                                </p>
                                <p>
                                    <label for="germinationTime">Days to Germinate</label>
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
export default Seedlings;