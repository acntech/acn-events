basedir = "../../../"
configDir = basedir + "config/"
email = require(configDir + "email.js")

describe "Send mail", () ->
  it 'should send mail with information about registration', (done) ->
    email.sendRegisteredMail(555555, "Ismar Slomic", "ismar@slomic.no", 99589889)
    done()
  it 'should send mail with information about unregistration', (done) ->
    email.sendUnRegisteredMail(555555, "Ismar Slomic", "ismar@slomic.no", 99589889)
    done()