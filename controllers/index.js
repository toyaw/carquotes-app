const express = require('express')
const controllers = express.Controllers()

controllers.get('/', (req, res) => {
  res.send('Hello World')
})

module.exports = router