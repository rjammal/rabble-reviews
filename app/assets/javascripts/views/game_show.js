RabbleReviews.Views.GameShow = Backbone.CompositeView.extend({

    initialize: function () {
        this.listenTo(this.model, "sync", this.render);

        var gameView = this;
        this.model.reviews().each( function (review) {
            var reviewShow = new RabbleReviews.Views.ReviewShow({ model: review });
            gameView.addSubview("#reviews", reviewShow);
        });
    },

    template: JST["game_show"], 

    render: function () {
        var renderedContent = this.template({ game: this.model });
        this.$el.html(renderedContent);
        this.attachSubviews();
        return this;
    }
});