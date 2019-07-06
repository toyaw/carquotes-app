
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load()
  }
  
  const express = require('express')
  const app = express()
  const expressLayouts = require('express-ejs-layouts')
  var exphbs  = require('express-handlebars')