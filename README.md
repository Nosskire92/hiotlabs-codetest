# Hiotlabs Codetest
## BUILD DOCKER IMAGE

```
docker build . -t [username]/hiotlabs-test
```
```
docker run -p 3000:3000 -d [username]/hiotlabs-test
```
## Dev dependencies
    "jest": "^27.5.1",
    "nodemon": "^2.0.15",
    "supertest": "^6.2.2"
## Dev scripts
### Starts api with nodemon
```
npm run devStart 
```
### Runs test suites with Jest/supertest
```
npm run test
```
## What i would like to improve

* Probably add some more data to the notes and todo lists like createdAt, maybe enable a scheduling function so people can schedule when their todos should be done/expire. Also add naming to the todolist so you can actually name them something instead of just refering to them by ID
* Obviously add something else then a internal list as a db, MongoDB would be nice.
* Then we can also use objectID instead of the way i do it in this example with length of arrays will lead to issues pretty quickly.
* Install mongoose and use it to create models, interact with the db and validate the data
* Create longer tests, right now i just look for the status code which can be very deceiving. Should also expect some values in the header, the body, the returned data values etc.
* Improve error handling, both in the code(routes, controllers) and testing of the errors. Right now its very basic.
* Improve logging, could be more specific depending on action etc.
* Split up testing into unit and integration testing so we can test against external services like databases.