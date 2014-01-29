## Screenshot of the event registration page
![Screenshot of the event registration page](screenshot.png)

## Prerequisites:
1. Install node (google it)
1. Install npm (google it)
1. Install mongodb (google it)
1. Install Ruby (google it)
1. Make sure that Ruby is installed correctly by running ruby --version from the terminal (make sure that PATH is set)
1. Install compass gem: `gem install compass`
1. Install grunt: `sudo npm install -g grunt`
1. Install bower: `sudo npm install -g bower`
1. Install C++ builder + libs by installing [Visual C++ 2010 Express](http://www.visualstudio.com/en-us/downloads#d-2010-express) (Windows only)
1. Set env variables to
* GOOGLE_SMTP_USERNAME (Unix: `export GOOGLE_SMTP_USERNAME="foo"`)
* GOOGLE_SMTP_PASSWORD (Unix: `export GOOGLE_SMTP_PASSWORD="bar"`)
* heroku config:set GOOGLE_SMTP_USERNAME=gmail-username-here GOOGLE_SMTP_PASSWORD=gmail-password-here

## To start development:
1. Check out this repo: `git clone git@github.com:acntech/acn-events.git`
1. Go to repo: `cd acn-events`
1. Download node dependencies (build time): `npm install`
1. Download web app dependencies (run time): `bower install`

## To start the server:
1. Run this command: `grunt server`

## To deploy to Heroku:
Prerequisites:

1. A Heroku user account. [Signup is free and instant](https://api.heroku.com/signup/devcenter).
1. Install the [Heroku Toolbelt](https://toolbelt.heroku.com/), which gives you git, Foreman, and the Heroku command-line interface.
1. Read [Getting starter with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)

Deploy:
1. If deploying to new application on your own account read [Getting starter with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)

1. git remote add heroku 'heroku git url here'
1. git push heroku master

Don't forget to add MongoLab add-on.

## To contact the developers:
The developers of this app chat at the acnteck room at IRC:
http://webchat.freenode.net/?channels=acntech&nick=

( Link for auto connecting without writing the nick every time:
	http://webchat.freenode.net/?channels=acntech&nick=>>your_name_here<< )
