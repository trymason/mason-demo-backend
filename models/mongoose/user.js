var mongoose = require("mongoose")
var bcrypt = require("bcrypt")
var uniqueValidator = require("mongoose-unique-validator")

var UserSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    authyID: { type: String, required: false },
    passwordHash: { type: String, required: true },
  }
)

UserSchema.plugin(uniqueValidator)

UserSchema.virtual("password").set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 8)
})

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash)
}

var User = mongoose.model("User", UserSchema)

module.exports = User