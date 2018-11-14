/* eslint-disable no-console */
const app = require('../server')

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
