const connection = require('../connection')

class UserAdminModel {

  static async findUserByEmail({ email }) {
    const userFound = await connection.userAdmin.findFirst({
      where: {
        email
      }
    })
    return userFound
  }
}

module.exports = UserAdminModel