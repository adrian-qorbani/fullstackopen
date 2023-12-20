interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface Describable {
  description: string;
}

interface Requirements {
  requirements: string[];
}

interface CoursePartBasic extends CoursePartBase, Describable {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBase, Describable {
  backgroundMaterial: string;
  kind: "background";
}

// New interface with the additional attributes
interface CoursePartWithRequirements extends CoursePartBase, Describable, Requirements {
  kind: "withRequirements";
}


export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartWithRequirements;

export const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
];
