const theatersService = require("./theaters.service");

function list(req, res, next) {
    const { movieId } = req.params;
    if (movieId) {
       theatersService
       .listByMovieId(movieId)
       .then((data) => {
           res.json({ data: data })
       })
       .catch(next);
    } else {
        theatersService
        .list()
        .then(data => {
            const promiseArray = data.map(theater => theatersService.getMoviesByTheater(theater.theater_id));
            return Promise.all(promiseArray)
            .then(moviesArray => {
                moviesArray.forEach((movies, i) => {
                    data[i].movies = movies
                })
                res.json({ data: data })
            })
            .catch(next)
        })
        .catch(next)
    }
}

module.exports = {
    list
}