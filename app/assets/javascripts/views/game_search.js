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
            this.$("#create-new-game").removeClass("hidden");
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
        "click #search-button": "search", 
        "change #advanced-search-wrapper-div": "parseSearch", 
        "click #caret-down": "toggleAdvanced"
    }, 

    search: function (event) {
        event.preventDefault();
        var $query = this.$("#query");
        var games = new RabbleReviews.Collections.Games();
        var gameIndex = new RabbleReviews.Views.GameIndex({ collection: games });
        this.$(".spinner").removeClass("hidden");
        this.$("#results").empty();
        var searchView = this;
        games.fetch({
            data: {query: $query.val(), page: 1}, 
            parse: true, 
            success: function () {
                searchView.$(".spinner").addClass("hidden");
                searchView.$(".search-errors").html("").removeClass("alert");
                searchView.$("#create-new-game").removeClass("hidden");
                searchView.addSubview("#results", gameIndex);
                searchView.$('.search-rows').addClass('searched');
                searchView.addSubview("#results", gameIndex);
                this.$("#advanced-search-wrapper-div").addClass("advanced-toggle-down");
                this.$("#advanced-search-wrapper-div").removeClass("advanced-toggle-up");
            }, 
            error: function (model, response) {
                searchView.$(".spinner").addClass("hidden");
                if (response.status === 422) {
                    text = JST["search_error"]();
                    searchView.$(".search-errors").html(text).addClass("alert alert-warning alert-dismissable");
                }
            }
        });
        RabbleReviews.sourceGames = games;
        RabbleReviews.sourceGames.lastQuery = $query.val();
    }, 

    parseSearch: function (event) {
        event.preventDefault();
        var $query = this.$('#query')
        var currentTextArray = $query.val().split(" ");
        var queryArray = [];
        currentTextArray.forEach(function (str) {
            if (str.indexOf(":") === -1) {
                queryArray.push(str);
            }
        });
        var propNames = ["min_rating", "max_rating", "min_reviews", "max_reviews", "game_type"]
        propNames.forEach(function (prop) {
            var value = this.$("#" + prop).val();
            if (value && value !== "") {
                queryArray.push(prop + ":" + value);
            }
        });

        $query.val(queryArray.join(" "));
    }, 

    toggleAdvanced: function (event) {
        event.preventDefault(); 
        this.$("#caret-up").toggleClass("flipped");
        this.$("#advanced-search-wrapper-div").toggleClass("advanced-toggle-up");
        this.$("#advanced-search-wrapper-div").toggleClass("advanced-toggle-down");
    }
});