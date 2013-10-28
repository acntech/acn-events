# dir paths
basedir = "../../../../"
appdir = basedir + "app/"
modeldir = appdir + "models/"
configdir = basedir + "config/"

# Mongoose setup
registrationModel = require(modeldir + 'registration')
mongoose = require('mongoose')
config = require(configdir + 'config')
Registration = mongoose.model('Registration')

# Action config
actions = require(configdir + 'actions')

# REST API module "Request"
request = require("request")

# Base url of test REST API
baseUrl = "http://localhost:5000"

describe "registration", ->
  it 'should respond with hello world', (done) ->
    request.get "http://localhost:5000/api/event/registrations/helloworld", (error, response, body) ->
      expect(body).toEqual "Hello World"
      expect(response.headers.link).toEqual "<http://localhost:5000/api/event/registrations/helloworld>; rel=\"self\", <http://localhost:5000/api/event/registrations/helloworld2>; rel=\"next\""
      done()

  it 'should retreive error when required fields are not filled out', (done) ->
    request
      method: actions.register.httpVerb
      uri: baseUrl + actions.register.route
    , (error, response, body) ->
      expect(response.statusCode).toEqual(400)
      done()

  it 'should register the user given all required fields are filled out and email is not registered', (done) ->
    newRegistration =
      person:
        name: "Ismar Slomic"
        email: "ismar1@slomic.no"
        phone: 99589889

    request
      method: actions.register.httpVerb
      uri: baseUrl + actions.register.route
      json: newRegistration
    , (error, response, body) ->
      expect(response.statusCode).toEqual(200)
      expect(body.state).toEqual(actions.register.endState)
      expect(response.headers.link).not.toBe(null)
      done()
    query = Registration.remove()
    query.exec()

  it 'should not register the user given already registered', (done) ->
    newRegistration =
      person:
        name: "Ismar Slomic"
        email: "ismar2@slomic.no"
        phone: 99589889

    request
      method: actions.register.httpVerb
      uri: baseUrl + actions.register.route
      json: newRegistration
    , (error, response, body) ->
      console.log("Finished registering")
      expect(response.statusCode).toEqual(200)
      request
        method: actions.register.httpVerb
        uri: baseUrl + actions.register.route
        json: newRegistration
      , (error, response, body) ->
        console.log("Finished registering")
        expect(response.statusCode).toEqual(400)
        done()

  it 'should unregister the user given user is registered', (done) ->
    newRegistration =
      person:
        name: "Ismar Slomic"
        email: "ismar3@slomic.no"
        phone: 99589889

    request
      method: actions.register.httpVerb
      uri: baseUrl + actions.register.route
      json: newRegistration
    , (error, response, body) ->
      console.log("Finished registering")
      newRegistration = body
      expect(response.statusCode).toEqual(200)
      request
        method: actions.unregister.httpVerb
        uri: baseUrl + actions.unregister.resolveRoute(newRegistration._id)
        json: newRegistration
      , (error, response, body) ->
        console.log("Finished unregistering")
        expect(response.statusCode).toEqual(200)
        expect(body.state).toEqual(actions.unregister.endState)
        done()

  it 'should confirm the user given user is registered', (done) ->
    newRegistration =
      person:
        name: "Ismar Slomic"
        email: "ismar4@slomic.no"
        phone: 99589889

    request
      method: actions.register.httpVerb
      uri: baseUrl + actions.register.route
      json: newRegistration
    , (error, response, body) ->
      newRegistration = body
      expect(response.statusCode).toEqual(200)
      request
        method: actions.confirm.httpVerb
        uri: baseUrl + actions.confirm.resolveRoute(newRegistration._id)
        json: newRegistration
      , (error, response, body) ->
        expect(response.statusCode).toEqual(200)
        expect(body.state).toEqual(actions.confirm.endState)
        done()

  it 'should unregister the user given user is confirmed', (done) ->
    newRegistration =
      person:
        name: "Ismar Slomic"
        email: "ismar5@slomic.no"
        phone: 99589889

    request
      method: actions.register.httpVerb
      uri: baseUrl + actions.register.route
      json: newRegistration
    , (error, response, body) ->
      newRegistration = body
      expect(response.statusCode).toEqual(200)
      request
        method: actions.confirm.httpVerb
        uri: baseUrl + actions.confirm.resolveRoute(newRegistration._id)
        json: newRegistration
      , (error, response, body) ->
        expect(response.statusCode).toEqual(200)
        expect(body.state).toEqual(actions.confirm.endState)
        request
          method: actions.unregister.httpVerb
          uri: baseUrl + actions.unregister.resolveRoute(newRegistration._id)
          json: newRegistration
        , (error, response, body) ->
          expect(response.statusCode).toEqual(200)
          expect(body.state).toEqual(actions.unregister.endState)
          done()

  it 'should checkIn the user given user is confirmed', (done) ->
    newRegistration =
      person:
        name: "Ismar Slomic"
        email: "ismar6@slomic.no"
        phone: 99589889

    request
      method: actions.register.httpVerb
      uri: baseUrl + actions.register.route
      json: newRegistration
    , (error, response, body) ->
      newRegistration = body
      expect(response.statusCode).toEqual(200)
      request
        method: actions.confirm.httpVerb
        uri: baseUrl + actions.confirm.resolveRoute(newRegistration._id)
        json: newRegistration
      , (error, response, body) ->
        expect(response.statusCode).toEqual(200)
        expect(body.state).toEqual(actions.confirm.endState)
        request
          method: actions.checkIn.httpVerb
          uri: baseUrl + actions.checkIn.resolveRoute(newRegistration._id)
          json: newRegistration
        , (error, response, body) ->
          expect(response.statusCode).toEqual(200)
          expect(body.state).toEqual(actions.checkIn.endState)
          done()
  it 'should fail when check in given user is registered', (done) ->
    newRegistration =
      person:
        name: "Ismar Slomic"
        email: "ismar7@slomic.no"
        phone: 99589889

    request
      method: actions.register.httpVerb
      uri: baseUrl + actions.register.route
      json: newRegistration
    , (error, response, body) ->
      newRegistration = body
      expect(response.statusCode).toEqual(200)
      request
        method: actions.checkIn.httpVerb
        uri: baseUrl + actions.checkIn.resolveRoute(newRegistration._id)
        json: newRegistration
      , (error, response, body) ->
        expect(response.statusCode).toEqual(400)
        mongoose.connect(config.db)
        Registration.remove (error) ->
          console.log "Error deleting docs in DB: " + erorr  if error
        console.log("Cleaned test data in db")
        mongoose.disconnect()
        done()
