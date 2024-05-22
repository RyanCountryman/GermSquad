// Table design copied from:
// Date 5/13/2024
// Author: Justin Hunter 
// https://plainenglish.io/blog/how-to-create-a-custom-table-component-in-react-7c37ad7a6518#the-tablerow-component
import React from 'react';
import TableHead from "./TableHead"
import TableRow from "./TableRow"


const Table = ({theadData, tbodyData, customClass}) => {
    return (
        <table className={customClass}>
            <thead>
                <tr>
                    {theadData.map((head) => {
                        return <TableHead key={head} item={head} />;
                    })}
                </tr>
            </thead>
            <tbody>
                {tbodyData.map((item) => {
                    return <TableRow key={item.id} data={item.items} />;
                })}
            </tbody>
        </table>
    )
};

export default Table