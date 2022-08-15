export type TLanguage = 'en' | 'pt'

const en = {
  fieldInvalid: 'some field is undefined',
  emailInvalid: 'email provided is invalid',
  passwordInvalid: 'password provided is invalid',
  nickInvalid: 'nickname provided is invalid',
  nameInvalid: 'user name provided is invalid',
  lastNameInvalid: 'last name provided is invalid',
  userAlreadyExists: 'email provided already in use',
  userNotFound: 'user not found',
  passwordIncorrect: 'password entered is incorrect',
}

const pt = {
  fieldInvalid: 'algum campo está inválido',
  emailInvalid: 'email informado está inválido',
  passwordInvalid: 'senha informada está inválida',
  nickInvalid: 'nickname está inválido',
  nameInvalid: 'nome de usuário está inválido',
  lastNameInvalid: 'sobrenome está inválido',
  userAlreadyExists: 'email informado já está em uso',
  userNotFound: 'usuário não encontrado',
  passwordIncorrect: 'senha informada está incorreta',
}

const getStringsInstance = (language?: TLanguage) => {
  switch (language) {
    case 'en':
      return en
    case 'pt':
      return pt
    default:
      return en
  }
}

export default getStringsInstance
