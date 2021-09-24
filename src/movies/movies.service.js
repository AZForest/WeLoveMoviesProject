const knex = require("../db/connection");

function list() {
    return knex("movies").select("*");
}

function listIsShowing() {
    return knex("movies_theaters")
            .groupBy("movie_id")
            .where({ is_showing: true })
}

function read(movie_id) {
    return knex("movies").select("*").where({ movie_id }).first();
}

module.exports = {
    list,
    listIsShowing,
    read
}