RabbleReviews.Collections.Games = Backbone.Collection.extend({
    model: RabbleReviews.Models.Game, 

    url: 'api/games', 

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