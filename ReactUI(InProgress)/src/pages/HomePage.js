import React from 'react';
import Table from '../components/Tables';




const PlantTable = () => {
    const customClass = "plantTable"
    const theadData = ["Name", "Email", "Date"];

    const tbodyData = [
        {
            id: "1",
            items: ["John", "john@email.com", "01/01/2021"],
        },
        {
            id: "2",
            items: ["Sally", "sally@email.com", "12/24/2020"],
        },
        {
            id: "3",
            items: ["Maria", "maria@email.com", "12/01/2020"],
        },
    ];
    return (
        <div>
            <Table theadData={theadData} tbodyData={tbodyData} customClass={customClass} />
        </div>
    );
};

export default PlantTable;