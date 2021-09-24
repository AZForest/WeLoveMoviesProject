const knex = require("../db/connection");

function getReviewsByMovieId(movie_id) {
    return knex("movies")
           .join("reviews", "movies.movie_id", "reviews.movie_id")
           .select("reviews.*")
           .where({ "reviews.movie_id": movie_id })
           .then(reviewsArray => {
                return reviewsArray;
           })
}

function getCriticInfo(critic_id) {
    return knex("critics").select("*").where({ critic_id }).first();
}

function checkReviewExists(review_id) {
    return knex("reviews").select("*").where({ review_id }).first();
}

function update(updatedReview) {
    return knex("reviews")
            .select("*")
            .where({ review_id: updatedReview.review_id })
            .update(updatedReview)
            .then(async () => {
                const returnReview = await knex("reviews").select("*").where({ review_id: updatedReview.review_id }).first();
                const criticInfo = await knex("reviews")
                                        .join("critics", "reviews.critic_id", "critics.critic_id")
                                        .select("critics.organization_name", "critics.preferred_name", "critics.surname")
                                        .where({ "critics.critic_id": returnReview.critic_id });
                const returnReviewWithCritic = {
                    ...returnReview,
                    critic: {
                        ...criticInfo[0],
                    },
                    created_at: new Date(),
                    updated_at: new Date()
                }
                return returnReviewWithCritic;
            });
}

function destroy(review_id) {
    return knex("reviews").where({ review_id }).del();
}

module.exports = {
    checkReviewExists,
    destroy,
    update,
    getReviewsByMovieId,
    getCriticInfo
}