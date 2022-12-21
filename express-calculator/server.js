import { app } from './app.js'
import chalk from 'chalk/index.js'

const port = 3000

app.listen(port, () => {
  console.log(chalk.magentaBright(`<== Express listening on port ${port} ==>`))
})