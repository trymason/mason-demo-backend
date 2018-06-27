const _ = require('lodash');
const Service = require('./service');

class UsersController {

    usersCreate(req, res) {
        const service = new Service(req);
        const validatedUser = service.validateUserRegistrationReq(req.body);
        if (validatedUser.error) {
          return res
          .status(validatedUser.status)
          .json({ error: validatedUser.error });
        }

        const sanitizedRequest = {
          email: _.trim(req.body.email),
          password: req.body.password,
          authyUserId: _.trim(req.body.authyUserId)
        };

        const create = data => {
          service.createUser(data)
          .then(user => {
            res.status(201).send(user);
          })
          .catch(err => {
            res.status(401).json({ error: `Error persisting user: ${err}` });
          });
        };
        create(sanitizedRequest);
    }

    loginUser(req, res) {
        const { email, password } = req.body;
        const service = new Service(req);

        if (_.isEmpty(_.trim(email)) || (_.isEmpty(password))) {
          return res.status(400).json("You must send the email and the password.");
        }
        service.logIn(email, password)
        .then(result => {
          if (result.error) {
            return res.status(result.status).json({ error: result.error });
          } else {
            return res.status(201).send(result);
          }
        });
    }
}

module.exports = new UsersController;
