const express = require('express')
const moongose = require('mongoose')
const config = require('config');

const PORT = config.get('PORT') || 5000

const app = express()
app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.api'))

const start = async () => {
  try {
    await moongose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
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
