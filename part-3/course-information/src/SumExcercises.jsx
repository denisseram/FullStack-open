const SumExercises = ({ course }) => {
  var totalExercises = 0;
  course.parts.forEach(part => {
    totalExercises += part.exercises
  })
  console.log('Total exercises: ' + totalExercises)
  return <p>Total exercises: {totalExercises}</p>
}


export default SumExercises