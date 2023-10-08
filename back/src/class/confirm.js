class Confirm {
  static #list = []

  constructor(data) {
    this.code = Confirm.generateCode()
    this.data = data
  }

  static generateCode() {
    return Math.floor(Math.random() * 9000) + 1000
  }

  static create(data) {
    const newConfirm = new Confirm(data)
    Confirm.#list.push(newConfirm)

    setTimeout(() => {
      Confirm.delete(newConfirm.code)
    }, 24 * 60 * 60 * 1000)

    console.log(Confirm.#list)
  }

  static delete(code) {
    const length = Confirm.#list.length
    Confirm.#list = Confirm.#list.filter(
      (item) => item.code !== code,
    )
    return length > Confirm.#list.length
  }

  static getData(code) {
    const obj = Confirm.#list.find(
      (item) => item.code === code,
    )
    return obj ? obj.data : null
  }
}

module.exports = {
  Confirm,
}
