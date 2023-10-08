const Total = ({ course }) => {
  
  // Updated for exercise 2.3 to use reduce to sum number of exercises 
  let total = course.parts.reduce((partialSum, a) => partialSum += a.exercises, 0);
  return <h4>Total of {total} exercises.</h4>;
};

export default Total;
