import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";
import { courseParts } from "./components/CourseParts";
const App = () => {
  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header />
      <Content />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
