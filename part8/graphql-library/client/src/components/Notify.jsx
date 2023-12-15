const Notify = ({ errorMessage }) => {
  return (
    <div style={{ color: 'red', padding: '5px', display: errorMessage ? 'block' : 'none' }}>
      {errorMessage}
    </div>
  );
};

export default Notify;