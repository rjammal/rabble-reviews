RabbleReviews.Views.GameSearch = Backbone.CompositeView.extend({

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
        return this;
    }, 

    className: "search-center",

    events: {
        "click #search-button": "search"
    }, 

    search: function (event) {
        event.preventDefault();
        var $searchbox = this.$("#search-box");
        this.model.set("query", this.$("#query").val())
        var searchView = this;
        this.model.save({}, {
            success: function (model, response) {
                searchView.$(".search-errors").html("").removeClass("alert");
                searchView.$("#create-new-game").removeClass("hidden");
                searchView.$('.search-rows').addClass('searched');
                var $results = searchView.$("#results").empty();
                var games = new RabbleReviews.Collections.Games(response);
                games.lastQuery = searchView.$("#query").val();
                RabbleReviews.sourceGames = games;
                var gameIndex = new RabbleReviews.Views.GameIndex({ collection: games });
                searchView.addSubview("#results", gameIndex);
            }, 
            error: function (model, response) {
                if (response.status === 422) {
                    text = JST["search_error"]();
                    searchView.$(".search-errors").html(text).addClass("alert alert-warning alert-dismissable");
                }
            }
        })
    }
});