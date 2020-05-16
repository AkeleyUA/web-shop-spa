const express = require('express')
const moongose = require('mongoose')
const config = require('config');
const path = require('path')
const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server)
const data = {
  anonymous: [],
  contentManager: [],
  moderator: [],
  supervisor: [],
  admin: []
}

io.on('connection', (socket) => {
  data.anonymous.push(socket.id)
  io.sockets.emit('stats', { data })

  socket.on('login', ({ accessLevel }) => {
    data.anonymous = data.anonymous.filter(id => id !== socket.id)
    if (accessLevel === 1) {
      data.contentManager.push(socket.id)
    }
    if (accessLevel === 2) {
      data.moderator.push(socket.id)
    }
    if (accessLevel === 3) {
      data.supervisor.push(socket.id)
    }
    if (accessLevel > 10) {
      data.admin.push(socket.id)
    }
    io.sockets.emit('stats', { data })
  })
  socket.on('logout', ({ accessLevel }) => {
    data.anonymous.push(socket.id)
    switch (accessLevel) {
      case 1: {
        data.contentManager = data.contentManager.filter(id => id !== socket.id)
      }
      case 2: {
        data.moderator = data.moderator.filter(id => id !== socket.id)
      }
      case 3: {
        data.supervisor = data.supervisor.filter(id => id !== socket.id)
      }
      case 100: {
        data.admin = data.admin.filter(id => id !== socket.id)
      }
    }
    io.sockets.emit('stats', { data })
  })

  socket.on('get stats', () => {
    socket.emit('stats', { data })
  })

  socket.on('disconnect', () => {
    data.anonymous = data.anonymous.filter(id => id !== socket.id)
    data.contentManager = data.contentManager.filter(id => id !== socket.id)
    data.moderator = data.moderator.filter(id => id !== socket.id)
    data.supervisor = data.supervisor.filter(id => id !== socket.id)
    data.admin = data.admin.filter(id => id !== socket.id)
    io.sockets.emit('stats', { data })
  })
})

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.api'))
app.use('/api/products', require('./routes/product.api'))
app.use('/api/categories', require('./routes/categories.api'))
app.use('/api/users', require('./routes/users.api'))

if (process.env.NODE_ENV === "production") {
  app.use('/', express.static(path.join(__dirname, 'front', 'build')))

  app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || config.get('PORT')

const start = async () => {
  try {
    await moongose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    server.listen(PORT, () => {
      console.log(`server started. PORT: ${PORT}`)
    })
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

start()
