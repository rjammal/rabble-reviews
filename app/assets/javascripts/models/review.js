RabbleReviews.Models.Review = Backbone.Model.extend({
    urlRoot: "api/reviews", 

    author: function () {
        this._author = this._author || new RabbleReviews.Models.User();
        return this._author;
    }, 

    reviewVotes: function () {
        this._reviewVotes = this._reviewVotes || new RabbleReviews.Collections.ReviewVotes();
        return this._reviewVotes;
    },

    parse: function (response) {
        if (response.author) {
            this._author = new RabbleReviews.Models.User(response.author);
            delete response.author
        }
        if (response.review_votes) {
            this.reviewVotes().set(response.review_votes, { parse: true });
            delete response.review_votes;
        }
        return response;
    }
});