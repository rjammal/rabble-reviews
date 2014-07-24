RabbleReviews.Views.SessionNew = Backbone.FormView.extend({
    template: JST["session_new"], 

    render: function () {
        var renderedContent = this.template();
        this.$el.html(renderedContent);
        return this;
    }
});