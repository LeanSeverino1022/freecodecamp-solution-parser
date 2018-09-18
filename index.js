'use strict'

const express = require('express')
const path    = require('path')

const app = express()

// Set the public folder diectory as /public on the web server for static files and images serving
app.use('/public', express.static('public'))

// Set all the routes to serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'))
})

// Run server on port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('App is listening on port %s', process.env.PORT || 3000)
})