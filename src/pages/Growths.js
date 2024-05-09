import React from 'react';

function Growths() {
    return (
        <body>
        <header>
            <h1>Growths Page</h1>
        </header>
        <main id="Growths">
            <section>
                <table id="planttable">
                    <tr>
                        <th>Growth ID</th>
                        <th>Plant ID</th>
                        <th>Plant Name</th>
                        <th>Start Date</th>
                        <th>Daily Sunlight Needed</th>
                        <th>Water Frequency</th>
                        <th>Fertilizer Frequency</th>

                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>Tomato</td>
                        <td>05/15/2024</td>
                        <td>14 Hours</td>
                        <td>Every 1 Days</td>
                        <td>Every 3 Days</td>
                        <button class= "btn btn-edit">Edit</button>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>2</td>
                        <td>Pepper</td>
                        <td>04/15/2024</td>
                        <td>16 Hours</td>
                        <td>Every 2 Days</td>
                        <td>Every 4 Days</td>
                        <button class= "btn btn-edit">Edit</button>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>3</td>
                        <td>Cucumber</td>
                        <td>04/15/2024</td>
                        <td>10 hours</td>
                        <td>Every 1 Days</td>
                        <td>Every 7 days</td>
                        <button class= "btn btn-edit">Edit</button>
                    </tr>

                </table>
            </section>
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