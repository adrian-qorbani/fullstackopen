import React from 'react';

interface TotalProps {
  totalExercises: number;
}

const Total: React.FC<TotalProps> = ({ totalExercises }) => {
  return <p>Number of exercises {totalExercises}</p>;
};

export default Total;