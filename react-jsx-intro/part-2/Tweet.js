const Tweet = (props) => {
  const { username, name, message, date } = props
  return (
    <div className='tweet'>
      <p>{message}</p>
      <div className='row'>
        <span>{username} ({name})</span> <span>{date}</span>
      </div>
    </div>
  )
}