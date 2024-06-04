import React from 'react';
import MyGarden from './MyGarden.jpg'

const HomePage = () => {
    return(
    <>
    <h2>Home Page</h2>
    <body>
        <figure class="home">
            <img src={MyGarden} alt='Garden'/>
        </figure>
        <h3>Garden in Progress</h3>
        
        
    </body>
    
    </>
    )
};

export default HomePage;