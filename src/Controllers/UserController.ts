import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import Env from '../Env/Env'
import BadRequest from '../Exception/BadRequest'
import UserModel from '../Model/UserModel'
import getStringsInstance, { TLanguage } from '../resources/strings'
import Validation from '../utils/Validation'
import UserResponse, { TUser } from '../Response/UserResponse'
import SessionController from './SessionController'

const salt = bcryptjs.genSaltSync()

const setLang = (lang: TLanguage) => {
  if (lang) Validation.LANGUAGE = lang
}

class UserController {
  public static async index(request: Request, response: Response) {
    setLang(request.params.lang as TLanguage)

    try {
      const { email, password } = request.body

      if (!Validation.isEmail(email)) {
        const strings = getStringsInstance(Validation.LANGUAGE)
        throw new BadRequest(422, strings.emailInvalid)
      } else if (password.length < 8) {
        const strings = getStringsInstance(Validation.LANGUAGE)
        throw new BadRequest(422, strings.passwordInvalid)
      }

      const userByEmail = await UserModel.findOne({ email }).select('+password')
      if (!userByEmail) {
        const strings = getStringsInstance(Validation.LANGUAGE)
        throw new BadRequest(422, strings.userNotFound)
      }
      if (!bcryptjs.compareSync(password, userByEmail.password)) {
        const strings = getStringsInstance(Validation.LANGUAGE)
        throw new BadRequest(409, strings.passwordIncorrect)
      }
      userByEmail.lastLogin = new Date()
      await userByEmail.save()
      const user = UserResponse.getInstance(userByEmail as unknown as TUser)
      const session = await SessionController.store(user.getUid())
      response.status(200).json({ user, session: { uid: session.uid, parent: session.parent } })
    } catch (error) {
      this.dispatchError(error, request, response)
    }
  }

  public static async store(request: Request, response: Response): Promise<void> {
    setLang(request.params.lang as TLanguage)

    try {
      const { nick, name, lastName, password, email } = request.body
      Validation.isFieldsValid(nick, name, lastName, password, email)

      const userByEmail = await UserModel.findOne({ email })
      if (!!userByEmail) {
        const strings = getStringsInstance(Validation.LANGUAGE)
        throw new BadRequest(422, strings.userAlreadyExists)
      }

      const passwordHash = bcryptjs.hashSync(password, salt)
      const userCreated = await UserModel.create({
        nick,
        name,
        lastName,
        email,
        password: passwordHash,
      })
      const user = UserResponse.getInstance(userCreated as unknown as TUser)
      const session = await SessionController.store(user.getUid())
      response.status(200).json({ user, session: { uid: session.uid, parent: session.parent } })
    } catch (error) {
      this.dispatchError(error, request, response)
    }
  }

  private static dispatchError(error: unknown, request: Request, response: Response) {
    if (Env.IS_DEV_MODE) console.log({ requisitionBody: request.body, error })
    if (error instanceof BadRequest)
      response.status(error.getStatus()).json({ error: { ...error } })
    else response.status(404).json({})
  }
}

export default UserController
