RabbleReviews.Collections.Games = Backbone.Collection.extend({
    model: RabbleReviews.Models.Game, 

    url: 'api/games', 

    parse: function (response) {

        this.pageNumber = parseInt(response.page_number);
        this.totalPages = parseInt(response.total_pages);
        return response.models;
    },

    getOrFetch: function (id) {
        var game = this.get(id)
        if (!game) {
            game = new RabbleReviews.Models.Game({ id: id });
            game.fetch();
            RabbleReviews.games.add(game);
        }
        return game;
    }, 

    comparator: function (game) {
        return -game.get("rating");
    }
});