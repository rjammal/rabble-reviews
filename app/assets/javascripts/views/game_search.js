RabbleReviews.Views.GameSearch = Backbone.CompositeView.extend({

    template: JST["search"], 

    render: function () {
        var renderedContent = this.template();
        this.$el.html(renderedContent);
        return this;
    }, 

    className: "search-center",

    events: {
        "click #search-button": "search"
    }, 

    search: function (event) {
        event.preventDefault();
        this.model.set("query", this.$("#query").val())
        var searchView = this;
        this.model.save({}, {
            success: function (model, response) {
                var $results = searchView.$("#results").empty();
                var games = new RabbleReviews.Collections.Games(response);
                var gameIndex = new RabbleReviews.Views.GameIndex({ collection: games });
                $results.html(gameIndex.render().$el);
            }, 
            error: function (model, response) {
                if (response.status === 422) {
                    text = JST["search_error"]();
                    searchView.$(".search-errors").html(text).addClass("alert alert-warning");
                }
            }
        })
    }
});