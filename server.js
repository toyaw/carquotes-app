

  
  const express = require('express')
  const app = express()
  const expressLayouts = require('express-ejs-layouts')
  //const exphbs  = require('express-handlebars')

 const controllersRouter = require('./controllers/index.js')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.use('/', controllersRouter)

app.listen(process.env.PORT || 3000)