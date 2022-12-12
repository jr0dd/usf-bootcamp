const App = () => (
  <div>
    <FirstComponent/>
    <NamedComponent name='Jared'/>
  </div>
)

ReactDOM.render(<App/>, document.getElementById("root"))