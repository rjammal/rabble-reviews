RabbleReviews.Views.GameIndex = Backbone.View.extend({
    template: JST["game_index"], 

    render: function () {
        var renderedContent = this.template();
        this.$el.html(renderedContent);
        return this;
    }
});