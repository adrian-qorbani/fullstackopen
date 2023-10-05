import { exercises1, exercises2, exercises3 } from "./Content";

const Total = () => {
  return (
    <div>
      <p>Total number of exercises is {exercises1 + exercises2 + exercises3}</p>
    </div>
  );
};

export default Total;
