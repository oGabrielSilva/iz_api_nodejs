import mongoose from 'mongoose'

export interface TUser extends UserResponse {
  _id: mongoose.Schema.Types.ObjectId
}

class UserResponse {
  private readonly uid: mongoose.Schema.Types.ObjectId
  private readonly nick: string
  private readonly name: string
  private readonly lastName: string
  private readonly email: string
  private readonly avatar: string
  private readonly lastLogin: Date
  private readonly status: string
  private readonly createdAt: Date
  private readonly updatedAt: Date

  private constructor(user: TUser) {
    this.avatar = user.avatar
    this.createdAt = user.createdAt
    this.email = user.email
    this.uid = user._id
    this.lastLogin = user.lastLogin
    this.lastName = user.lastName
    this.name = user.name
    this.nick = user.nick
    this.status = user.status
    this.updatedAt = user.updatedAt
  }

  public getUid() {
    return this.uid
  }

  public static getInstance(user: TUser) {
    return new UserResponse(user)
  }
}

export default UserResponse
