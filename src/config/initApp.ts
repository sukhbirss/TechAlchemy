import dotenv from 'dotenv'
import {
  IUserDocument,
} from '../Types'
import 'colors'

declare global {
  namespace Express {
    interface Request {
      user: IUserDocument
    }
  }
}

dotenv.config({ path: __dirname + '/config.env' }) // this needs to be defined here so that all imports can get access to env

if (process.env.NODE_ENV === 'development')
  console.log('Initialize app settings'.magenta.bold)
