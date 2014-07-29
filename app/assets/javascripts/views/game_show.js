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

        var reviewNew = new RabbleReviews.Views.ReviewNew({ model: this.model });
        this.addSubview("#review-new", reviewNew);
    },

    template: JST["game_show"], 

    id: "game-show",

    events: {
        "click #new-query": "blankSearch"
    },

    blankSearch: function (event) {
        delete RabbleReviews.sourceGames;
    }, 

    render: function () {
        var renderedContent = this.template({ game: this.model });
        this.$el.html(renderedContent);
        this.attachSubviews();
        if (this.alreadyAuthored()) {
            var newReviewArray = this.subviews()["review-new"]
            var subview = newReviewArray && newReviewArray[0];
            //don't remove if already removed
            if (subview) {
                this.removeSubview("#review-new", subview);
            }
            this.$("#review-new").html("");
        }
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
        var avg = rating / this.model.reviews().length;
        this.model.set("rating", avg.toFixed(2));
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