RabbleReviews.Collections.ReviewVotes = Backbone.Collection.extend({
    model: RabbleReviews.Models.ReviewVote, 

    url: "api/review_votes"
});