const knex = require("../db/connection");

function listByMovieId(movie_id) {
    return knex("movies_theaters")
           .join("theaters", "movies_theaters.theater_id", "theaters.theater_id")
           .select("theaters.*", "movies_theaters.*")
           .where({ "movies_theaters.movie_id": movie_id });
}

function getMoviesByTheater(theater_id) {
    return knex("movies_theaters")
           .join("movies", "movies_theaters.movie_id", "movies.movie_id")
           .select("movies.*")
           .where({ "movies_theaters.theater_id": theater_id })
}

function list() {
    return knex("theaters").select("*")
}

module.exports = {
    list,
    listByMovieId,
    getMoviesByTheater
}