const express = require('express')
const app = express()

const cors = require('cors')
const morgan = require('morgan')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./routers/users')
app.use('/users', userRouter)
const postRouter = require('./routers/posts')
app.use('/users/:id/posts', postRouter)
const commentsRouter = require('./routers/comments')
app.use('/users/:id/comments', commentsRouter)
const categoryRouter = require('./routers/categories')
app.use('/categories', categoryRouter)

module.exports = app