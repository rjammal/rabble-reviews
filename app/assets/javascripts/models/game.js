RabbleReviews.Models.Game = Backbone.Model.extend({
    urlRoot: "api/games", 

    genres: function () {
        this._genres = this._genres || new RabbleReviews.Collections.Genres();
        return this._genres;
    },

    reviews: function () {
        this._reviews = this._reviews || new RabbleReviews.Collections.Reviews();
        return this._reviews;
    }, 

    parse: function (response) {
        if (response.genres) {
            this.genres().set(response.genres, { parse: true });
            delete response.genres;
        }
        if (response.reviews) {
            this.reviews().set(response.reviews, { parse: true });
            delete response.reviews
        }
        return response;
    }
});