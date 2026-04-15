const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Header = (props) => <h2>{props.course}</h2>

const Content = (props) => (
  <div>
    {props.parts.map(part =>
      <Part key={part.id} part={part} />
    )}
  </div>
)
const Total = (props) => <b>Total of {props.total} exercises</b>

const Course = (props) => (
  <div>
    <Header course={props.course.name} />
    <Content parts={props.course.parts} />
    <Total
      total={
        props.course.parts.reduce( (s, p) => s + p.exercises, 0 )
      }
    />
  </div>
)

export default Course