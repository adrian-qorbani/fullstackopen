import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  return (
    <div>
      {course.map((eachCourse) => (
        <div key={eachCourse.id}>
          <Header text={eachCourse.name} />
          <Content course={eachCourse} />
          <Total course={eachCourse} />
        </div>
      ))}
    </div>
  );
};

export default Course;
