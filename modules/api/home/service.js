class UsersService {

    constructor(req) {
      this.req = req
    }
  
    fetchUsers() {
      const { User } = this.req.models
      return User.find()
    }
  
    fetchUserById(id) {
      const { User } = this.req.models
      return User.findById(id)
    }
  
    createUser(data) {
      const { User } = this.req.models
      return User.create(data)
    }
  
    findByIdAndUpdate(id, body) {
      const { User } = this.req.models
      const { fname, lname, password } = body
      let updates = {}
  
      if (email) {
        updates.email = email
      }
      if (password) {
        if (this.validatePassword(password).error) {
          return this.validatePassword(password)
        } else {
          updates.password = password
        }
      }
      return User.findByIdAndUpdate(id, updates)
    }
  
    logIn(email, password) {
      const { User } = this.req.models
      return User.findOne({ email }).then(user => {
        if (!user || !user.validatePassword(password)) {
          return { status: 401, error: "The email or password doesn't match." }
        } else {
            return user
        }
      })
    }
}
  
module.exports = UsersService