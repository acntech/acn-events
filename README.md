# Accenture Events - Backend application
git clone https://github.com/acntech/acn-events-backend.git
cd acn-events-backend
heroku login // only first time
git clone git@heroku.com:ads-cms-backend.git distHeroku
npm install
grunt build:heroku
cd distHeroku
node server


# The new domain-model:
The new domain model is made using https://www.draw.io/
