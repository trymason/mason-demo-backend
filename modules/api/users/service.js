class UsersService {

    constructor(req) {
      this.req = req;
    }

    createUser(data) {
      const { User } = this.req.models;
      return User.create(data);
    }

    logIn(email, password) {
      const { User } = this.req.models;
      return User.findOne({ email }).then(user => {
        if (!user || !user.validatePassword(password)) {
          return { status: 401, error: "The email or password doesn't match." };
        } else {
            return user.getPublicObject();
        }
      });
    }

    validatePassword(password) {
        if (!password) {
          return { status: 400, error: "You must provide a password." };
        }
        if (password.length < 8) {
          return { status: 400, error: "Password must be 8 characters or longer." };
        }
        if (password.length > 128) {
          return { status: 400, error: "Password must be 128 characters or less." };
        }
        return true;
    }

    validateUserRegistrationReq(user) {
        if (!user.email) {
          return { status: 400, error: "You must provide an email." };
        }
        if (!user.authyUserId) {
          return { status: 400, error: "You must provide an authyUserId." };
        }
        const validatePassword = this.validatePassword(user.password);

        if (validatePassword.error) {
          return validatePassword;
        }

        return true;
    }
}

module.exports = UsersService;