// Table design copied from:
// Date 5/13/2024
// Author: Justin Hunter 
// https://plainenglish.io/blog/how-to-create-a-custom-table-component-in-react-7c37ad7a6518#the-tablerow-component

import React from "react";

const TableHeadItem = ({ item }) => {
    return (
        <td title={item}>
            {item}
        </td>
    );
};

export default TableHeadItem;