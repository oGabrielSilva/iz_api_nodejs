import { model, Schema } from 'mongoose'

const userSchema = new Schema(
  {
    nick: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true, select: false },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: '' },
    lastLogin: { type: Date, default: Date.now },
    status: { type: String, default: '' },
  },
  { timestamps: true }
)

const UserModel = model('User', userSchema)

export default UserModel
