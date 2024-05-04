const TeamInterface = require('./team.interface')

class UserInterface {
  constructor(user) {
    this.id = user.id
    this.email = user.email
    this.username = user.username
    this.budget = user.budget
    this.team = new TeamInterface(user.team)
  }
}

module.exports = UserInterface