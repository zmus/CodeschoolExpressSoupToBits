npm shrinkwrap
  = mandatory if node_modules are in .gitignore
  * otherwise Heroku will throw error

heroku 
  + help
    + <command>

  + logs 
    + --tail 
      = continually stream logs

  + config:[get/set/unset]
    = app config vars
    * heroku config:set NODE_ENV=production
      = define environment: production/development/test...

  + addons:create <addon>

  + restart
    = restart dyno


npm init
git init
echo 'node_modules' >> .gitignore
heroku apps:create <name>

npm shrinkwrap
git add/commit
git push heroku master



Heroku runs your apps by executing the main command in your Procfile. This is often a command to start a web server.

These commands are executed in dynos — isolated, lightweight, share-nothing, Linux containers.

To scale a web app, you can start more dynos that run the web server.

Heroku's routers automatically direct traffic across all web dynos randomly, and the Dyno Manager keeps your dynos running.