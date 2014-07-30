RabbleReviews.Views.GameShow = Backbone.CompositeView.extend({

    initialize: function () {

        this.listenTo(this.model, "sync change:rating", this.render);
        var reviews = this.model.reviews()
        this.listenTo(reviews, "add", this.addReview);
        this.listenTo(reviews, "add", this.calculateRating);

        var gameView = this;
        this.model.reviews().each( function (review) {
            gameView.addReview(review);
        });

        // saving state for if I need to cancel an image change
        this.imagePlaceholder = this.model.get("image");

        var reviewNew = new RabbleReviews.Views.ReviewNew({ model: this.model });
        this.addSubview("#review-new", reviewNew);
    },

    template: JST["game_show"], 

    id: "game-show",

    events: {
        "click #new-query": "blankSearch", 
        "click #edit-button": "edit", 
        "click #save-button": "save", 
        "click #cancel-button": "cancel",
        "change .photo-upload": "handleFile",
        "click #dropdown-genres": "genreSelect", 
    },

    blankSearch: function (event) {
        delete RabbleReviews.sourceGames;
    }, 

    edit: function (event) {
        event.preventDefault();
        this.$(".show-details").addClass("hidden");
        this.$(".edit").removeClass("hidden");
    }, 

    save: function (event) {
        event.preventDefault();
        this.model.set("game_type", this.$("#game-type").val());
        this.model.set("min_players", this.$("#min-players").val());
        this.model.set("max_players", this.$("#max-players").val());
        this.model.set("year_released", this.$("#year-released").val());

        var genres = [];
        this.$(".genre").each( function (index, checkbox) {
            if ($(checkbox).is(":checked")) {
                genres.push($(checkbox).val());
            }
        });
        this.model.set("genres", genres);

        this.$("#save-button").text("Loading...").prop("disabled", "disabled");

        // removing image when it's a missing image url
        var image = this.model.get("image");
        if (image.slice(0, 10) !== "data:image") {
            this.model.set("image", "");
        }

        var editView = this;
        this.model.save({}, {
            success: function (model) {
                editView.$("#save-button").text("Save").removeProp("disabled");
                editView.imagePlaceholder = model.get("image");
                this.$(".edit").addClass("hidden");
                this.$(".show-details").removeClass("hidden");               
            }, 
            error: function (model, response) {
                editView.$("#save-button").text("Save").removeProp("disabled");
                Backbone.FormView.prototype.handleErrors.call(editView, response.responseJSON);
            }
        });

        // replacing image in case removed
        this.model.set("image", image);

    },

    cancel: function (event) {
        event.preventDefault();
        this.model.set("image", this.imagePlaceholder);
        this.render();
        this.$(".edit").addClass("hidden");
        this.$(".show-details").removeClass("hidden");
    },

    handleFile: function (event) {
        var view = this;
        Backbone.FormView.prototype.handleFile.call(this, event, function () {
            view.$('img').attr("src", view.model.get("image"));
        });
    },

    genreSelect: function (event) {
        event.stopPropagation();
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