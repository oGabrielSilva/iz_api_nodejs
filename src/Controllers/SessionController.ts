import mongoose from 'mongoose'
import SessionModel from '../Model/SessionModel'

class SessionController {
  public static async store(parent: mongoose.Schema.Types.ObjectId) {
    const sessionsByParent = await SessionModel.find({ parent })

    if (sessionsByParent.length > 0) {
      sessionsByParent.forEach((session) => session.delete())
    }
    const session = await SessionModel.create({ parent })
    return session
  }
}

export default SessionController
