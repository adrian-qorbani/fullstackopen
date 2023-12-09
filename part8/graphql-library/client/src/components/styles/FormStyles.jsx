const FormStyles = () => {
  return (
    <style>
    <style>
      {
        `form {
          display: grid;
          gap: 10px;
          max-width: 300px;
          margin: auto;
        }
        label {
          text-align: right;
        }
        input {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 5px;
          grid-column: 2 / -1;
        }
        button {
          grid-column: 2 / -1;
          padding: 8px;
          cursor: pointer;
        }`
      }
    </style>
    </style>
  );
};

export default FormStyles;
