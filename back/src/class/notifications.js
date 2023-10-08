class Notifications {
  static #list = []
  static #count = 1

  constructor({ userId, type, message }) {
    this.id = Notifications.#count++
    this.userId = userId
    this.type = type
    this.message = message
    this.date = new Date()
  }

  static createNotification = (data) => {
    const notification = new Notifications(data)

    this.#list.push(notification)

    console.log(this.#list)

    return notification
  }

  static getByUserId = (id) => {
    const userNotifications = this.#list.filter(
      (notification) => notification.userId === id,
    )
    console.log(userNotifications)

    return userNotifications
  }
}

module.exports = {
  Notifications,
}
