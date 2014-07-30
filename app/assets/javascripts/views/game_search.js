RabbleReviews.Views.GameSearch = Backbone.CompositeView.extend({

    initialize: function () {
        var game = new RabbleReviews.Models.Game();
        var newGameView = new RabbleReviews.Views.GameNew({ model: game });
        this.addSubview("#modal-wrapper", newGameView);
    },

    template: JST["search"], 

    render: function () {
        var renderedContent = this.template();
        this.$el.html(renderedContent);
        if (RabbleReviews.sourceGames) {
            this.$("#query").val(RabbleReviews.sourceGames.lastQuery);
            this.$('.search-rows').addClass('searched');
            var gameIndex = new RabbleReviews.Views.GameIndex({ collection: RabbleReviews.sourceGames });
            this.addSubview("#results", gameIndex);
        }
        this.attachSubviews();
        $("#modal-wrapper").modal();
        return this;
    }, 

    remove: function () {
        Backbone.CompositeView.prototype.remove.call(this);
        $("#modal-wrapper").modal("hide");
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    },

    className: "search-center",

    events: {
        "click #search-button": "search"
    }, 

    search: function (event) {
        event.preventDefault();
        var $query = this.$("#query");
        var games = new RabbleReviews.Collections.Games();
        var gameIndex = new RabbleReviews.Views.GameIndex({ collection: games });
        var searchView = this;
        games.fetch({
            data: {query: $query.val(), page: 1}, 
            parse: true, 
            success: function () {
                var $results = searchView.$("#results").empty();
                searchView.addSubview("#results", gameIndex);
                searchView.$(".search-errors").html("").removeClass("alert");
                searchView.$("#create-new-game").removeClass("hidden");
                searchView.$('.search-rows').addClass('searched');
                searchView.addSubview("#results", gameIndex);
            }, 
            error: function (model, response) {
                if (response.status === 422) {
                    text = JST["search_error"]();
                    searchView.$(".search-errors").html(text).addClass("alert alert-warning alert-dismissable");
                }
            }
        });
        RabbleReviews.sourceGames = games;
        RabbleReviews.sourceGames.lastQuery = $query.val();
    }
});