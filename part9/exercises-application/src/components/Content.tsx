import React from "react";
import {
  courseParts,
  // assertNever
} from "./CourseParts";

const Course: React.FC = () => {
  return (
    <div>
      <h1>Course Parts</h1>
      <ul>
        {courseParts.map((part, index) => (
          <li key={index}>
            <strong>{part.name}</strong> - Exercise Count: {part.exerciseCount}
            <br />
            {(() => {
              switch (part.kind) {
                case "basic":
                  return (
                    <>
                      <em>{part.description}</em>
                      <br />
                      <span>Kind: {part.kind}</span>
                    </>
                  );
                case "group":
                  return (
                    <>
                      <span>Group Project Count: {part.groupProjectCount}</span>
                      <br />
                      <span>Kind: {part.kind}</span>
                    </>
                  );
                case "background":
                  return (
                    <>
                      <em>{part.description}</em>
                      <br />
                      <span>
                        Background Material: {part.backgroundMaterial}
                      </span>
                      <br />
                      <span>Kind: {part.kind}</span>
                    </>
                  );
                default:
                  // return assertNever(part);
                  return null;
              }
            })()}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Course;
