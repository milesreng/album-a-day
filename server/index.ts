import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import passport from 'passport'
import MongoStore from 'connect-mongo'
import pino from 'pino'
import expressPinoLogger from 'express-pino-logger'
import { Strategy as SpotifyStrategy } from 'passport-spotify'

import { User } from './src/models/user.model'

dotenv.config()

const HOST = process.env.HOST || '127.0.0.1'

const app = express()
const MONGODB_URI = process.env.MONGODB_URI || ''
const PORT = process.env.PORT || 5174
const CORS_ORIGIN = 5173

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || ''
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || ''
const CALLBACK_URL = process.env.DEV_REDIRECT_URI || ''

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

export const logger = pino({
  transport: {
    target: 'pino-pretty'
  }
})

app.use(cors({
  origin: `http://${HOST}:${CORS_ORIGIN}`,
  credentials: true
}))

app.use(session({
  secret: 'abcdefg',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
  store: MongoStore.create({
    mongoUrl: MONGODB_URI,
    ttl: 14 * 24 * 60 * 60    // 14 days
  })
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/auth/spotify', passport.authenticate('spotify', {
  scope: ['user-read-email', 'user-read-private']
}))

app.get('/auth/spotify/callback', 
  passport.authenticate('spotify', { failureRedirect: '/login' }),  
  (req: Request, res: Response) => {
    res.redirect('/')
  }
)

mongoose.set('strictQuery', true)

mongoose.connect(MONGODB_URI).then(async () => {
  logger.info('Connected to MongoDB')

  passport.use(
    new SpotifyStrategy({
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      passReqToCallback: true
    }, async (req: Request, accessToken: string, refreshToken: string, expires_in: number, profile: any, done: any) => {
      let user = await User.findOne({ spotifyId: profile.id })
      
      if (!user) {
        user = await User.create({
          spotifyId: profile.id 
        })
      }

      return done(null, user)
    })
  )


  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
  })
}).catch((err: any) => {
  logger.error('An error occurred')
})