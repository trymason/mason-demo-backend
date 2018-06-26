const express = require("express")
const Service = require('./service')

class HomeController {
    usersShow(req, res) {
        const service = new Service(req)
        const { id } = req.params
    
        service.fetchUserById(id)
        .then(user => {
          user = user.toObject()
          delete user.passwordHash
          res.json({ user: user })
        })
        .catch(e => {
          console.log(`\nError at GET /users/${id}`, e)
          res.status(400).json({ error: e })
        })
    }

    usersCreate(req, res) {
        const { User } = req.models
        const service = new Service(req)
        const { email, password } = req.body
        const validatedUser = service.validateUserRegistrationReq(req.body)

        if (validatedUser.error) {
          return res
          .status(validatedUser.status)
          .json({ error: validatedUser.error })
        }
    
        const create = data => {
          service.createUser(data)
          .then(user => {
            res.status(201).send(user)
          })
          .catch(e => {
            res.status(401).json({ error: `Error persisting user: ${err}` })
          })
        }
    
        const findOrCreate = (query, data) => {
          return User.findOne(query)
          .then(user => {
            if (user) {
              return res.status(200).send(user)
            } else {
              create(data)
            }
          })
        }
        findOrCreate({ email }, { email, password })
    }

    loginUser(req, res) {
        const { email, password } = req.body
        const service = new Service(req)
    
        if (!email || !password) {
          return res.status(400).json("You must send the email and the password.")
        }
        service.logIn(email, password)
        .then(result => {
          if (result.error) {
            return res.status(result.status).json({ error: result.error })
          } else {
            return res.status(201).send(result)
          }
        })
    }

    addAuthyID(req, res) {
        const service = new Service(req)
        const { id, authyID } = req.body

    }
}

module.exports = new HomeController
