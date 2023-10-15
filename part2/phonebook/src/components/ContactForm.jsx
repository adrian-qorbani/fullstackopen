const ContactForm = ({
  addNewName,
  newName,
  newNumber,
  handleNameInputChange,
  handleNumberInputChange,
}) => {
  return (
    <div id="wrapper">
      <div id="contactForm">
        <form id="contactForm" onSubmit={addNewName}>
          <div>
            Name
            <br />{" "}
            <input
              className="input-field"
              value={newName}
              onChange={handleNameInputChange}
            />
          </div>
          <div>
            Number
            <br />{" "}
            <input
              className="input-field"
              value={newNumber}
              onChange={handleNumberInputChange}
            />
          </div>
          <div>
            <button className="submit-btn" type="submit">
              ADD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
