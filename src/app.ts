import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { resolve } from 'path'
import Constants from './Constants/Constants'
import router from './Router/Router'

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(resolve(__dirname, '..', 'public')))

app.use(router)

mongoose
  .connect(process.env.MONGO as string)
  .then(() => app.emit(Constants.MONGO_CONNECT_EMIT))
  .catch(() => console.log('Mongoose connect error'))

app.on(Constants.MONGO_CONNECT_EMIT, () =>
  app.listen(process.env.PORT, () => console.log('App on http://localhost:' + process.env.PORT))
)
