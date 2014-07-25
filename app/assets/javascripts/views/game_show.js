RabbleReviews.Views.GameShow = Backbone.View.extend({

    initialize: function () {
        this.listenTo(this.model, "sync", this.render);
    },

    template: JST["game_show"], 

    render: function () {
        var renderedContent = this.template({ game: this.model });
        this.$el.html(renderedContent);
        return this;
    }
});