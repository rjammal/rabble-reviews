RabbleReviews.Views.GameNew = Backbone.FormView.extend({
    template: JST["game_new"],

    render: function () {
        var renderedContent = this.template({ game: this.model });
        this.$el.html(renderedContent);
        return this;
    }
});