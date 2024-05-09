import React from 'react';

function Fertilizers() {
    return (
        <body>
        <header>
            <h1>Fertilizer Page</h1>
        </header>
        <main id="Fertilizers">
            <section>
                <table id="planttable">
                    <tr>
                        <th>Fertilizer ID</th>
                        <th>Fertilizer Type</th>
                        <th>Nitrogen</th>
                        <th>Phosphorous</th>
                        <th>Potassium</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Liquid Big Bloom</td>
                        <td>0</td>
                        <td>0.5</td>
                        <td>0.7</td>
                        <button class= "btn btn-edit">Edit</button>
                        <button class= "btn btn-delete">Delete</button>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Liquid Grow Big</td>
                        <td>6</td>
                        <td>4</td>
                        <td>4</td>
                        <button class= "btn btn-edit">Edit</button>
                        <button class= "btn btn-delete">Delete</button>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Liquid Tiger Bloom</td>
                        <td>2</td>
                        <td>8</td>
                        <td>4</td>
                        <button class= "btn btn-edit">Edit</button>
                        <button class= "btn btn-delete">Delete</button>
                    </tr>
                </table>
            </section>
            <section >
                <h2>Create New Fertilizer</h2>
                <article>
                    <form action="/Fertilizers" method="POST">
                        <fieldset>
                            <legend>Fertilizer</legend>
                            <p>
                                <label for="Fertilizer">Fertilizer Type</label>
                                <input type= "text"/>
                            </p>
                            <p>
                                <label for="Nitrogen">Nitrogen</label>
                                <input type="text"/>
                            </p>
                            <p>
                                <label for="Phosphorous">Phosphorous</label>
                                <input type="text"/>
                            </p>
                            <p>
                                <label for="Potassium">Potassium</label>
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
export default Fertilizers;