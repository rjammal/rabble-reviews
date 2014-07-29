RabbleReviews.Views.GameShow = Backbone.CompositeView.extend({

    initialize: function () {
        this.listenTo(this.model, "sync change", this.render);
        var reviews = this.model.reviews()
        this.listenTo(reviews, "add", this.addReview);
        this.listenTo(reviews, "add", this.calculateRating);

        var gameView = this;
        this.model.reviews().each( function (review) {
            gameView.addReview(review);
        });

        if (!this.alreadyAuthored()) {
            var reviewNew = new RabbleReviews.Views.ReviewNew({ model: this.model });
            this.addSubview("#review-new", reviewNew);
        }
    },

    template: JST["game_show"], 

    id: "game-show",

    render: function () {
        var renderedContent = this.template({ game: this.model });
        this.$el.html(renderedContent);
        this.attachSubviews();
        return this;
    }, 

    addReview: function (review) {
        var reviewShow = new RabbleReviews.Views.ReviewShow({ model: review });
        this.addSubview("#reviews", reviewShow);
    }, 

    calculateRating: function () {
        var rating = 0;
        this.model.reviews().each( function (review) {
            rating += review.get("rating");
        })
        this.model.set("rating", rating / this.model.reviews().length);
    },

    alreadyAuthored: function () {
        var authored = false;
        this.model.reviews().each( function (review) {
            if (review.author().get("id") === parseInt(RabbleReviews.currentUser.id)) {
                authored = true;
                return false;
            }
        });
        return authored;
    }
});