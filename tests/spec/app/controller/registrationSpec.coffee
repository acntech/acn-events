basedir = undefined
registrationModel = undefined
request = undefined
basedir = "../../../../"
appdir = basedir + "app/"
registrationModel = require(appdir + "/models/registration.js")
request = require("request")

describe "registration", ->
  it 'should respond with hello world', (done) ->
    request.get "http://localhost:5000/api/event/registrations/helloworld", (error, response, body) ->
      expect(body).toEqual "Hello World"
      expect(response.headers.link).toEqual "<http://localhost:5000/api/event/registrations/helloworld>; rel=\"self\", <http://localhost:5000/api/event/registrations/helloworld2>; rel=\"next\""
      done()

  it 'should retreive error when required fields are not filled out', (done) ->
    request
      method: "POST"
      uri: "http://localhost:5000/api/event/registrations/"
    , (error, response, body) ->
      expect(response.statusCode).toEqual(400)
      done()

  it 'should register the user given all required fields are filled out and email is not registered', (done) ->
    newRegistration =
      person:
        name: "Ismar Slomic"
        email: "ismar@slomic.no222"
        phone: 99589889

    request
      method: "POST"
      uri: "http://localhost:5000/api/event/registrations/"
      json: newRegistration
    , (error, response, body) ->
      expect(response.statusCode).toEqual(200)
      expect(response.headers.link).not.toBe(null)
      done()



  xit 'should unregister the user given he is registered', (done) ->
    newRegistration =
      person:
        name: "Ismar Slomic"
        email: "ismar@slomic.no"
        phone: 99589889

    request
      method: "DELETE"
      uri: "http://localhost:5000/api/event/registrations/"
      json: newRegistration
    , (error, response, body) ->
      console.log(body)
      console.log(response.headers.link)
      expect(response.statusCode).toEqual(200)
      expect(response.headers.link).not.toBe(null);
      done()

  xit 'should unregister the user given his registration is confirmed', (done) ->
    newRegistration =
      person:
        name: "Ismar Slomic"
        email: "ismar@slomic.no"
        phone: 99589889

    request
      method: "DELETE"
      uri: "http://localhost:5000/api/event/registrations/"
      json: newRegistration
    , (error, response, body) ->
      console.log(body)
      console.log(response.headers.link)
      expect(response.statusCode).toEqual(200)
      expect(response.headers.link).not.toBe(null);
      done()

  xit 'should retreive error when unregistering given user has checked in', (done) ->
    newRegistration =
      person:
        name: "Ismar Slomic"
        email: "ismar@slomic.no"
        phone: 99589889

    request
      method: "DELETE"
      uri: "http://localhost:5000/api/event/registrations/"
      json: newRegistration
    , (error, response, body) ->
      console.log(body)
      console.log(response.headers.link)
      expect(response.statusCode).toEqual(403)
      expect(response.headers.link).not.toBe(null);
      done()
  xit 'should retreive error when registering user with duplicate email address', (done) ->