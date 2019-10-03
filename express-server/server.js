const express = require('express')
const app = express() // create a server app with the express library
const port = process.argv[2] || 8000 // if they didn't specify a port, use 8000

// app.use(express.static(`${__dirname}/www`)) // use the www folder for all requests

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/package.json`)
})

// run the server, it automatically starts listening for requests
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}, CTRL + C to shutdown`)
})
