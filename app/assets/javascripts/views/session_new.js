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

    login: function (event) {
        event.preventDefault();
        var name, password
        if ($(event.currentTarget).attr("id") === "guest") {
            name = "Guest";
            password = "password";
        } else {
            name = this.$("#name").val();
            password = this.$("#password").val();
        }
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
                view.handleErrors(response.responseJSON);
            }
        });
    }
});