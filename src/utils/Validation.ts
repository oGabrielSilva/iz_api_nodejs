import BadRequest from '../Exception/BadRequest'
import getStringsInstance, { TLanguage } from '../resources/strings'

class Validation {
  public static LANGUAGE: TLanguage | undefined = 'en'

  public static isEmail(email: string): boolean {
    if (email.length <= 5) return false
    if (!email.includes('@')) return false
    const emailSplit = email.split('@')[1]

    if (!emailSplit.includes('.')) return false
    const emailDot = emailSplit.split('.')

    if (emailDot.length <= 1) return false

    if (emailDot[0].length <= 1 || emailDot[1].length <= 1) return false

    return true
  }

  public static isFieldsValid(
    nick: string,
    name: string,
    lastName: string,
    password: string,
    email: string
  ) {
    if (
      typeof nick !== 'string' ||
      typeof name !== 'string' ||
      typeof lastName !== 'string' ||
      typeof password !== 'string' ||
      typeof email !== 'string'
    ) {
      const strings = getStringsInstance(Validation.LANGUAGE)
      throw new BadRequest(422, strings.fieldInvalid)
    }

    if (!this.isEmail(email)) {
      const strings = getStringsInstance(this.LANGUAGE)
      throw new BadRequest(422, strings.emailInvalid)
    }
    if (password.length < 8) {
      const strings = getStringsInstance(this.LANGUAGE)
      throw new BadRequest(422, strings.passwordInvalid)
    }
    if (nick.length < 1) {
      const strings = getStringsInstance(this.LANGUAGE)
      throw new BadRequest(422, strings.nickInvalid)
    }
    if (name.length < 2) {
      const strings = getStringsInstance(this.LANGUAGE)
      throw new BadRequest(422, strings.nameInvalid)
    }
    if (lastName.length < 2) {
      const strings = getStringsInstance(this.LANGUAGE)
      throw new BadRequest(422, strings.lastNameInvalid)
    }
  }
}

export default Validation
