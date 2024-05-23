import React, {useState, useEffect} from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';

function Fertilizers() {
    const [Fertilizers, setFertilizers] = useState([]);

    const customClass = "plantTable"
    const theadData = ["Fertilizer ID", "Fertilizer Type", "Nitrogen", "Phosphorous", "Potassium", "Modify"];

    const tbodyData = [
        {
            id: "1",
            items: ["1", "Liquid Big Bloom", "0", "0.5", "0.7", <Buttons key={Fertilizers.id} />],
            
            
        },
        {
            id: "2",
            items: ["2", "Liquid Grow Big", "6", "4", "4", <Buttons key={Fertilizers.id} />],
        },
        {
            id: "3",
            items: ["3", "Liquid Tiger Bloom", "2", "8", "4", <Buttons key={Fertilizers.id} />],
        },
    ];
    return (
        <body>
        <header>
            <h2>Fertilizer Page</h2>
        </header>
        <main id="Fertilizers">
            <div>
                <Table theadData={theadData} tbodyData={tbodyData} customClass={customClass} />
            </div>
            <section >
                <h3>Create New Fertilizer</h3>
                <article>
                    <form action="/Fertilizers" method="POST">
                        <fieldset>
                            <legend>New Fertilizer</legend>
                            <p>
                                <label for="Fertilizer">Fertilizer Type </label>
                                <input type= "text"/>
                            </p>
                            <p>
                                <label for="Nitrogen">Nitrogen </label>
                                <input type="number"/>
                            </p>
                            <p>
                                <label for="Phosphorous">Phosphorous </label>
                                <input type="number"/>
                            </p>
                            <p>
                                <label for="Potassium">Potassium </label>
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
</body> 
    )
}
export default Fertilizers;