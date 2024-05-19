const connection = require('../connection')

class UserAdminModel {

  static async findUserByEmail({ email }) {
    return await connection.userAdmin.findFirst({
      where: {
        email
      }
    })
  }
}

module.exports = UserAdminModel