const App = () => (
  <div>
    <Tweet
      username='j_r0dd'
      name='jared w'
      date={new Date().toDateString()}
      message='this is my 1st tweet!!!'
    />
    <Tweet
      username='joemama'
      name='joe smith'
      date={new Date().toDateString()}
      message='yo mama'
    />
    <Tweet
      username='elons_son'
      name='joshua'
      date={new Date().toDateString()}
      message='elon is daddy'
    />
  </div>
)
