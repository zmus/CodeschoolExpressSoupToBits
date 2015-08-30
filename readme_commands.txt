npm shrinkwrap
  = locks versions of dependencies on every call  (NOT devDependencies!)
  * creates 'npm-shrinkwrap.json'
  * used if you don't include /node_modules in GIT repository
    * $ echo 'node_modules' >> .gitignore

npm install <package> --save-dev 
  = for installing non-runtime dependencies
  * only for development and testing
  * package.json under "devDependencies"

curl localhost:3000
  + -I
    = response header 
  + -i
    = response header + response

Express automatically manages ETag
  = hash of response body
  * if included in the next request and matches, content hasn't changed
    => empty response + 304 Not Modified 