import React from 'react'

const Course = ({course}) => {
  
    return (
      <>
        <Header course={course}/>
        <>{course.parts.map((part) => <Content key={part.id} courseName={part.name} totalExercises={part.exercises} />)}</>
        <Total total={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
      </>
    )
  }
  
  const Header = ({course}) => <h1>{course.name}</h1>
  
  const Part = ({courseName, totalExercises}) => <p>{courseName} {totalExercises}</p>
  
  const Content = ({courseName, totalExercises}) => <div><Part courseName={courseName} totalExercises={totalExercises} /></div>
  
  const Total = ({total}) => <p>Number of exercises: {total}</p>

export default Course