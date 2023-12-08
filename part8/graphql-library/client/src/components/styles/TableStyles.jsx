import React from "react";

const TableStyles = () => {
  const tableStyle = {
    border: "1px solid #ddd",
    borderCollapse: "collapse",
    width: "100%",
  };
  const thStyle = {
    border: "1px solid #ddd",
    backgroundColor: "#f2f2f2",
    padding: "8px",
    textAlign: "left",
  };
  const tdStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  };

  return (
    <style>
      {`table {
          border: ${tableStyle.border};
          border-collapse: ${tableStyle.borderCollapse};
          width: ${tableStyle.width};
        }
        th {
          border: ${thStyle.border};
          background-color: ${thStyle.backgroundColor};
          padding: ${thStyle.padding};
          text-align: ${thStyle.textAlign};
        }
        td {
          border: ${tdStyle.border};
          padding: ${tdStyle.padding};
          text-align: ${tdStyle.textAlign};
        }`}
    </style>
  );
};

export default TableStyles;
