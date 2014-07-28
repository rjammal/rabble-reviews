RabbleReviews.Views.GameIndex = Backbone.View.extend({
    
    initialize: function () {
        this.listenTo(this.collection, "sync add sort", this.render);
    },

    template: JST["game_index"], 

    render: function () {
        var renderedContent = this.template({ games: this.collection });
        this.$el.html(renderedContent);
        return this;
    }
});