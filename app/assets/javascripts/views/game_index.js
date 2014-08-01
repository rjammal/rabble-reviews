RabbleReviews.Views.GameIndex = Backbone.View.extend({
    
    initialize: function () {
        this.listenTo(this.collection, "sync add sort", this.render);
    },

    template: JST["game_index"], 

    render: function () {
        var renderedContent = this.template({ games: this.collection });
        this.$el.html(renderedContent);
        this.listenForScroll();
        return this;
    }, 

    remove: function () {
        Backbone.View.prototype.remove.call(this);
        $(window).off("scroll");
    },

    listenForScroll: function () {
        $(window).off("scroll"); 
        var throttledCallback = this.throttledScroll();
        $(window).on("scroll", throttledCallback);
    }, 

    throttledScroll: function () {
        return _.throttle(this.nextPage.bind(this), 200);
    }, 

    nextPage: function () {
        if (this.$el.scrollTop() > $(document).height() - $(window).height() - 50) {
            if (this.collection.pageNumber < this.collection.totalPages) {
                this.collection.fetch({
                    data: { page: this.collection.pageNumber + 1, query: this.collection.query}, 
                    remove: false
                });
            }
        }
    }
});