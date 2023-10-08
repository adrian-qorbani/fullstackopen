import Part from "./Part";

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((eachCourse) => (
        <Part key={eachCourse.id} name={eachCourse.name} exercises={eachCourse.exercises} />
      ))}
    </div>
  );
};

export default Content;
