// ================================================================

class User {
  static #list = []
  static #count = 1

  constructor({ email, password }) {
    this.id = User.#count++

    this.email = String(email).toLowerCase()
    this.password = String(password)
    this.isConfirm = false
  }

  static create = (data) => {
    const user = new User(data)

    this.#list.push(user)

    console.log(this.#list)

    return user
  }

  static getByEmail = (email) => {
    const user = this.#list.find(
      (user) => user.email === String(email).toLowerCase(),
    )
    if (user) {
      return user
    }

    return false
  }

  static getById = (id) => {
    const user = this.#list.find(
      (user) => user.id === Number(id),
    )
    if (user) {
      return user
    }

    return false
  }

  static getlist = () => this.#list

  static confirmByEmail = (email) => {
    const user = this.getByEmail(email)

    if (user) user.isConfirm = true
  }

  static updateEmail = (newEmail, oldEmail, password) => {
    const user = User.getByEmail(oldEmail)

    if (
      user &&
      user.password === password &&
      user.email === oldEmail
    ) {
      if (User.getByEmail(newEmail)) {
        return false
      }
      user.email = newEmail

      return user
    }
    return false
  }

  static updatePassword = (
    email,
    password,
    newPassword,
  ) => {
    const user = User.getByEmail(email)

    if (user && user.password === password) {
      user.password = newPassword
      user.isConfirm = false

      return user
    }
    return false
  }
}

module.exports = {
  User,
}
