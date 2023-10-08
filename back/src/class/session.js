class Session {
  static #list = []

  constructor(user) {
    this.token = Session.generateCode()
    this.user = {
      email: user.email,
      isConfirm: user.isConfirm,
      id: user.id,
    }
  }

  static generateCode() {
    const length = 6
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const generateCharacter = () =>
      characters[
        Math.floor(Math.random() * characters.length)
      ]

    const token = Array.from(
      { length },
      generateCharacter,
    ).join('')

    return token
  }

  static create(data) {
    const session = new Session(data)
    this.#list.push(session)
    return session
  }

  static get(token) {
    const session = this.#list.find(
      (item) => item.token === token,
    )
    console.log('Session list:', this.#list)
    return session || null
  }
}

module.exports = {
  Session,
}
