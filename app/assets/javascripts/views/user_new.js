RabbleReviews.Views.UserNew = Backbone.FormView.extend({
    template: JST["user_new"], 

    render: function () {
        var renderedContent = this.template();
        this.$el.html(renderedContent);
        return this;
    }
});