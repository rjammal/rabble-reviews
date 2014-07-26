RabbleReviews.Models.Review = Backbone.Model.extend({
    urlRoot: "api/reviews", 

    author: function () {
        this._author = this._author || new RabbleReviews.Models.User();
        return this._author;
    }, 

    parse: function (response) {
        if (response.author) {
            this._author = new RabbleReviews.Models.User(response.author);
            delete response.author
        }
        return response;
    }
});