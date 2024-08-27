import { Express } from 'express'
import mongoose from 'mongoose'

export interface SpotifyUser extends Express.User {
  spotifyId: string,
  picture: string | null
}

export interface IUser extends mongoose.Document {
  spotifyId: string
}

export const userSchema = new mongoose.Schema<IUser>({
  spotifyId: {
    type: String,
    unique: true
  }
})

export const User = mongoose.model<IUser>('User', userSchema)