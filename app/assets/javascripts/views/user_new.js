RabbleReviews.Views.UserNew = Backbone.FormView.extend({
    
    initialize: function () {
        var splashURL = this.getRandomSplashURL();
        $('body').attr("style", "background-image:url(" + splashURL + ")");
    },

    template: JST["user_new"], 

    className: "access-site",

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
        var password2 = this.$("#password2").val();
        if (password !== password2) {
            this.handleErrors(["The two passwords must match!"]);
            return;
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
                $('body').removeAttr("style");
                Backbone.history.navigate("games", { trigger: true });
            }, 
            error: function (model, response) {
                view.handleErrors(response.responseJSON);
            }
        })
    }
});