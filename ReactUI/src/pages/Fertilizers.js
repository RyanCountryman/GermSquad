import React, {useState, useEffect} from 'react';
import Table from '../components/Tables';
import Buttons from '../components/Buttons';

function Fertilizers() {
    const [fertilizers, setFertilizers] = useState([]);

    const customClass = "plantTable"
    const theadData = ["Fertilizer ID", "Fertilizer Type", "Nitrogen", "Phosphorous", "Potassium", "Modify"];


    const tbodyData = fertilizers.map(fertilizer => {  
        return {
            id: fertilizer.fertilizerID,
            items: [
                fertilizer.fertilizerID,
                fertilizer.fertilizerType,
                fertilizer.nitrogen,
                fertilizer.phosphorous,
                fertilizer.potassium,
                <Buttons key={fertilizer.id} />
            ]
        }
    });


    const loadFertilizers = async ()=>{
        const response = await fetch('http://localhost:8500/Fertilizers'); //TODO Change Fetch url
        const fertilizers = await response.json();
        setFertilizers(fertilizers);
    }

    useEffect(() => {
        loadFertilizers();
    })



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