const express = require('express')
const app = express()

const cors = require('cors')
const morgan = require('morgan')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./routers/users')
const postRouter = require('./routers/posts')
const commentsRouter = require('./routers/comments')
const categoryRouter = require('./routers/categories')

app.use('/users', userRouter)

app.use('/users', postRouter)
app.use('/posts', postRouter)

app.use('/users/:id/comments', commentsRouter)

app.use('/categories', categoryRouter)

module.exports = app