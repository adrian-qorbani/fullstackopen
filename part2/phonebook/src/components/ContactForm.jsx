const ContactForm = ({addNewName, newName, newNumber, handleNameInputChange, handleNumberInputChange}) => {
  return (
    <form onSubmit={addNewName}>
      <div>
        Name: <input value={newName} onChange={handleNameInputChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberInputChange} />
      </div>
      <div>
        <button type="submit">ADD</button>
      </div>
    </form>
  );
};

export default ContactForm;
