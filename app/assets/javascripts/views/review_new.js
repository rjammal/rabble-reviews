RabbleReviews.Views.ReviewNew = Backbone.FormView.extend({

    template: JST["review_new"], 

    render: function () {
        var renderedContent = this.template();
        this.$el.html(renderedContent);
        return this;
    }, 

    events: {
        "click button": "saveReview"
    }, 

    saveReview: function (event) {
        event.preventDefault();
        var review = new RabbleReviews.Models.Review();
        review.set("author_id", RabbleReviews.currentUser.id);
        review.set("rating", this.$("#rating").val());
        review.set("review_body", this.$("#review-body").val());
        review.set("game_id", this.model.get("id"));

        var view = this;
        review.save({}, {
            success: function (model) {
                view.model.reviews().add(model);
                view.remove();
            }, 
            error: function (model, response) {
                view.handleErrors(response.responseJSON);
            }
        })
    }
});