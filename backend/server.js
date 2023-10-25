const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const logger = require('morgan')
const authRoutes = require('./routes')

const PORT = process.env.PORT || 9000
const app = express()

if (process.env.NODE_ENV !== 'production') {
  console.log('using webpack')

  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../webpack/dev.config')

  // setup middleware
  const compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
}

app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.resolve(__dirname, '../public')))
app.use('/', authRoutes)

app.listen(PORT, () => {
  console.log(`app listening on PORT ${PORT}`)
})