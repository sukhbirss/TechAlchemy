import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

import { IUserDocument } from '../Types'
import { createSignedToken, generateRandomString } from '../utils/auth'

const UserSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: [true, 'Please provide name field'],
    },
    email: {
      type: String,
      required:  [true, 'Please provide email field'],
      index: true,
    },
    password: {
      type: String,
      required:  [true, 'Please provide password field'],
    },
    hash: {
      type: String,
      default:() => generateRandomString(15)
    },
    role: {
      type: String,
      default: 'USER',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// Encrypt password using bcrypt
UserSchema.pre<IUserDocument>(
  'save',
  async function (this: IUserDocument, next) {
    if (!this.isModified('password')) next()

    if (this.password) {
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
    }
  },
)

// Match user Entered password to hash password in db
UserSchema.methods.matchPassword = async function (
  this: IUserDocument,
  enteredPassword: string,
) {
  if (this.password) return await bcrypt.compare(enteredPassword, this.password)
  else return false
}

UserSchema.methods.getSignedJwtToken = function (this: IUserDocument) {
  if(this.role === 'USER') return createSignedToken(this, 'USER', process.env.ACCESS_TOKEN_SECRET!, process.env.JWT_ACCESS_EXPIRE!)
}

UserSchema.methods.getRefreshJwtToken = function (this: IUserDocument) {
  if(this.role === 'USER') return createSignedToken(this, 'USER',  process.env.REFRESH_TOKEN_SECRET!, process.env.JWT_REFRESH_EXPIRE!)
}



export default model<IUserDocument>('User', UserSchema)
