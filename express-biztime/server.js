/** Server startup for BizTime. */
import { app } from './app.js'

app.listen(3000, () => {
  console.log('Listening on 3000')
})