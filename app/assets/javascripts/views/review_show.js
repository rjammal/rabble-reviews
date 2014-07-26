RabbleReviews.Views.ReviewShow = Backbone.View.extend({
    
    tagName: "li",

    template: JST["review_show"], 

    render: function () {
        var renderedContent = this.template({ review: this.model });
        this.$el.html(renderedContent);
        return this;
    }
});