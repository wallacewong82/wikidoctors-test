import React from "react";
import {FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const SortableHeader = ({ label, field, handleSort, sortConfig }) => {
  return (
    <th
      onClick={() => handleSort(field)}
      style={{ cursor: "pointer", backgroundColor: "white", fontSize:"14px" }}
    >
      {label}{" "}
      {sortConfig.key === field ?
        (sortConfig.direction === "ascending" ? <FaSortUp /> : <FaSortDown />):<FaSort/>}
    </th>
  );
};

export default SortableHeader;
