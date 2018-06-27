const Service = require('./service');

class HomeController {

    usersCreate(req, res) {
        const { User } = req.models;
        const service = new Service(req);
        const { email, password, authyUserId } = req.body;
        const validatedUser = service.validateUserRegistrationReq(req.body);

        if (validatedUser.error) {
          return res
          .status(validatedUser.status)
          .json({ error: validatedUser.error });
        }

        const create = data => {
          service.createUser(data)
          .then(user => {
            res.status(201).send(user);
          })
          .catch(err => {
            res.status(401).json({ error: `Error persisting user: ${err}` });
          });
        };

        const findOrCreate = (query, data) => {
          return User.findOne(query)
          .then(user => {
            if (user) {
              return res.status(200).send(user);
            } else {
              create(data);
            }
          });
        };
        findOrCreate({ email }, { email, password });
    }

    loginUser(req, res) {
        const { email, password } = req.body;
        const service = new Service(req);

        if (!email || !password) {
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

module.exports = new HomeController;
