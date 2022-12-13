const Person = (props) => {
  const { name, age, hobbies } = props
  let msg
  age >= 18 ? msg = 'please go vote!' : msg = 'you must be 18'

  return (
    <div>
      <p>Learn some information about this person</p>
      <span><b>{name.slice(0,6)} - {age}</b></span>
      <ul>Hobbies: {hobbies.map(hobby =>
        (
          <li>
            <b>{hobby}</b>
          </li>
        )
      )}</ul>
      <h3>{msg}</h3>
    </div>
  )
}