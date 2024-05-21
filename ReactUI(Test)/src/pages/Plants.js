import React from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';

function Plants() {
    const customClass = "plantTable"
    const theadData = ["Plant ID", "Plant Name", "Season Completed", "Modify"];

    const tbodyData = [
        {
            id: "1",
            items: ["1", "Tomato", "No", Buttons()],
            
            
        },
        {
            id: "2",
            items: ["2", "Pepper", "No", Buttons()],
        },
        {
            id: "3",
            items: ["3", "Cucumber", "Yes", Buttons()],
        },
    ];
    return (
        <body>
            <header>
                <h2>Plants Home Page</h2>
            </header>
            <main id="Plants">
                <div>
                    <Table theadData={theadData} tbodyData={tbodyData} customClass={customClass} />
                </div>
                    
                <section >
                    <h3>Create New Entry</h3>
                    <article>
                        <h5>What are you planting?</h5>
                        <form action="/Plants" method="POST">
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
    </body> 
    )
}
export default Plants;