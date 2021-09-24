const moviesService = require("./movies.service");

function movieExists(req, res, next) {
    const { movieId } = req.params;
    moviesService
        .read(movieId)
        .then((movie) => {
            if (movie) {
                res.locals.movie = movie;
                next();
            }
            next({
                status: 404,
                message: `Movie cannot be found with movie_id: ${movieId}`
            })
        })
        .catch(next);
        
}

function list(req, res, next) {
    const { is_showing } = req.query;
    if ( is_showing ) {
        moviesService
        .listIsShowing()
        .then((data) => res.json({ data }))
        .catch(next);
    } else {
        moviesService
        .list()
        .then((data) => res.json({ data }))
        .catch(next);
    }
}

function read(req, res, next) {
    res.json({ data: res.locals.movie });
}

module.exports = {
    list,
    read: [movieExists, read]
}