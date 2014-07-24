RabbleReviews.Views.UserNew = Backbone.FormView.extend({
    template: JST["user_new"], 

    render: function () {
        var renderedContent = this.template({ user: this.model });
        this.$el.html(renderedContent);
        return this;
    },

    events: {
        "click form button": "signup"
    },

    signup: function () {
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
        })
    }
});