const express = require('express')
const moongose = require('mongoose')
const config = require('config');
const path = require('path')


const app = express()
app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.api'))
app.use('/api/products', require('./routes/product.api'))
app.use('/api/categories', require('./routes/categories.api'))

if(process.env.NODE_ENV === "production") {
  app.use('/', express.static(path.join(__dirname, 'front', 'build')))

  app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 80

const start = async () => {
  try {
    await moongose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })
    app.listen(PORT, () => {
      console.log(`server started. PORT: ${PORT}`)
    })
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

start()
