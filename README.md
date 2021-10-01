# WeLoveMoviesProject

Restful API that allows a client to interact with movie, review, and theater data contained within a database. 

* To run -> fork/clone respository -> npm install -> npm run start

## Routes

### /movies

* Methods allowed: Get (List)

### /movies/:movieId

* Methods allowed: Get (Read)

### /movies/:movieId/theaters

* Methods allowed: Get (List)

### /movies/:movieId/reviews

* Methods allowed: Get (List)

### /movies/:movieId/reviews/:reviewId

* Methods allowed: Put, Delete
### /reviews

* Methods Allowed: Get (List)

### /reviews/:reviewId

* Methods allowed: Put, Delete

### /theaters

* Methods allowed: Get (List)


## Technology

### Built with: 

* Express, Node
* Knex

### Database:

* PostgresQL
