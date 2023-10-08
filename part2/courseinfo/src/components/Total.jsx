const Total = ({ course }) => {
  // total variable defined
  let total = 0;

  // map through courses and adding number of exercise to total
  course.parts.map((eachCourse) => (total += eachCourse.exercises));

  return <h4>Total of {total} exercises.</h4>;
};

export default Total;
