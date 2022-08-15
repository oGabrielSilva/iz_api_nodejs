import { model, Schema } from 'mongoose'
import { v4 } from 'uuid'

const genUid = () => `${v4()}-${v4()}`

const sessionSchema = new Schema({
  uid: { type: String, default: genUid },
  parent: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
})

const SessionModel = model('Session', sessionSchema)

export default SessionModel
