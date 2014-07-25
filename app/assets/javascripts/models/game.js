RabbleReviews.Models.Game = Backbone.Model.extend({
    urlRoot: "api/games", 

    genres: function () {
        this._genres = this._genres || new RabbleReviews.Collections.Genres();
        return this._genres;
    },

    parse: function (response) {
        if (response.genres) {
            this.genres().set(response.genres, { parse: true });
            delete response.genres;
        }
        return response;
    }
});