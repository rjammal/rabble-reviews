RabbleReviews.Views.GameIndex = Backbone.View.extend({
    
    initialize: function () {
        this.listenTo(this.collection, "sync add sort", this.render);
    },

    template: JST["game_index"], 

    render: function () {
        var renderedContent = this.template({ games: this.collection });
        this.$el.html(renderedContent);
        return this;
    }, 

    // events: {
    //     "click tr": "showGame"
    // }, 

    // showGame: function (event) {
    //     // event.preventDefault();
    //     // var $row = $(event.currentTarget);
    //     // var game = RabbleReviews.games.getOrFetch($row.data("game-id"));
    //     // var showView = new RabbleReviews.Views.GameShow({ model: game });
    //     RabbleReviews.sourceGames = this.collection;

    // }
});