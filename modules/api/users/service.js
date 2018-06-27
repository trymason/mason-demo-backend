class UsersService {

    constructor(req) {
      this.req = req;
      this.User = req.models.User;
    }

    createUser(data) {
      return this.User.create(data);
    }

    logIn(email, password) {
      return this.User.findOne({ email }).then(user => {
        if (!user || !user.validatePassword(password)) {
          return { error: "The email or password doesn't match." };
        } else {
            return user;
        }
      });
    }

    validatePassword(password) {
        if (!password) {
          return { error: "You must provide a password." };
        }
        if (password.length < 8) {
          return { error: "Password must be 8 characters or longer." };
        }
        if (password.length > 128) {
          return { error: "Password must be 128 characters or less." };
        }
        return true;
    }

    validateUserRegistrationReq(user) {
        if (!user.email) {
          return { error: "You must provide an email." };
        }
        if (!user.authyUserId) {
          return { error: "You must provide an authyUserId." };
        }
        const validatePassword = this.validatePassword(user.password);

        if (validatePassword.error) {
          return validatePassword;
        }

        return true;
    }
}

module.exports = UsersService;