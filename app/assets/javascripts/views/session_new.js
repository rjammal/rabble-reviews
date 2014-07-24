RabbleReviews.Views.SessionNew = Backbone.FormView.extend({
    // the model here will actally be a session object, but it will behave the same as a user
    // it just sends to a different url

    template: JST["session_new"], 

    render: function () {
        var renderedContent = this.template({ user: this.model });
        this.$el.html(renderedContent);
        return this;
    }, 

    events: {
        "click form button": "login"
    }, 

    login: function () {
        var name = $el.$("#name").val();
        var password = $el.$("#password").val();
        this.model.set("name", name);
        this.model.set("password", password);
        var view = this;
        this.model.save({
            success: function () {
                Backbone.history.navigate("games");
            }, 
            error: function (model, response) {
                view.handleErrors(model, response);
            }
        });
    }
});