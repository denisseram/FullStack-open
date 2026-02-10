const SumExercises = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  console.log('Total exercises: ' + totalExercises)
  return <p>Total exercises: {totalExercises}</p>
}


export default SumExercises