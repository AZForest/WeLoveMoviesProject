const reviewsService = require("./reviews.service");

function idExists(req, res, next) {
    const { reviewId } = req.params;
    reviewsService
        .checkReviewExists(reviewId)
        .then((data) => {
            if (data) {
                res.locals.review = data;
                return next();
            }
            next({
                status: 404,
                message: "Review cannot be found."
            })
        })
        .catch(next);
}

function list(req, res, next) {
    const { movieId } = req.params;
    reviewsService
        .getReviewsByMovieId(movieId)
        .then((reviews) => {
            const criticInfoPromises = reviews.map(r => reviewsService.getCriticInfo(r.critic_id));
            return Promise.all(criticInfoPromises)
            .then(criticInfo => {
                console.log(criticInfo);
                criticInfo.forEach((entry, i) => {
                    reviews[i].critic = entry;
                })
                res.json({ data: reviews });
            })
            .catch(next)
        })
        .catch(next)
}

function update(req, res, next) {
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id
    }
    reviewsService
        .update(updatedReview)
        .then((data) => {
            return res.json({ data: data })
        })
        .catch(next)
}

function destroy(req, res, next) {
    reviewsService
        .destroy(res.locals.review.review_id)
        .then(() => res.sendStatus(204))
        .catch(next)
}

module.exports = {
    list,
    delete: [idExists, destroy],
    update: [idExists, update]
}