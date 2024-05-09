import React from 'react';

function Plants() {
    return (
        <body>
            <header>
                <h1>Plants Home Page</h1>
            </header>
            <main id="Plants">
                <section>
                    <table id="planttable">
                        <tr>
                            <th>Plant ID</th>
                            <th>Plant Name</th>
                            <th>Season Completed</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Tomato</td>
                            <td>No</td>
                            <button class= "btn btn-edit">Edit</button>
                            <button class= "btn btn-delete">Delete</button>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Pepper</td>
                            <td>No</td>
                            <button class= "btn btn-edit">Edit</button>
                            <button class= "btn btn-delete">Delete</button>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Cucumber</td>
                            <td>Yes</td>
                            <button class= "btn btn-edit">Edit</button>
                            <button class= "btn btn-delete">Delete</button>
                        </tr>

                    </table>
                </section>
                <section >
                    <h2>Create New Entry</h2>
                    <article>
                        <p>What are you planting?</p>
                        <form action="/HomePage" method="POST">
                            <fieldset>
                                <legend>New Plant</legend>
                                <p>
                                    <label for="plant">Plant Type</label>
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
export default Plants;