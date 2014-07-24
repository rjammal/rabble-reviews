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

    signup: function (event) {
        event.preventDefault();
        var name = this.$("#name").val();
        var password = this.$("#password").val();
        this.model.set("name", name);
        this.model.set("password", password);
        var view = this;
        this.model.save({}, {
            success: function (model) {
                RabbleReviews.currentUser = {
                    id: model.escape("id"), 
                    name: model.escape("name")
                };
                Backbone.history.navigate("games", { trigger: true });
            }, 
            error: function (model, response) {
                view.handleErrors(model, response);
            }
        })
    }
});