RabbleReviews.Views.GameNew = Backbone.FormView.extend({
    
    initialize: function () {
        this.listenTo(RabbleReviews.genres, "sync", this.render);
    },

    template: JST["game_new"],

    render: function () {
        var renderedContent = this.template({ game: this.model });
        this.$el.html(renderedContent);
        return this;
    }, 

    events: {
        "click button#submit": "saveGame",
        "change #photo": "handleFile"
    }, 

    saveGame: function (event) {
        event.preventDefault();

        var genres = [];
        $(".genre").each( function (index, checkbox) {
            if ($(checkbox).prop('checked')) {
                genres.push($(checkbox).val());
            }
        });
        this.model.set("genres", genres);

        var name = this.$("#name").val();
        var gameType = this.$("#game_type").val();
        var minPlayers = this.$("#min-players").val();
        var maxPlayers = this.$("#max-players").val();
        var yearReleased = this.$("#released").val();

        this.model.set("name", name);
        this.model.set("game_type", gameType);
        this.model.set("min_players", minPlayers);
        this.model.set("max_players", maxPlayers);
        this.model.set("year_released", yearReleased);

        var view = this;
        this.model.save({}, {
            success: function (model) {
                RabbleReviews.games.add(model);
                Backbone.history.navigate("#games/" + model.id, { trigger: true });
            }, 
            error: function (model, response) {
                view.handleErrors(response.responseJSON);
            }
        })
    }
});