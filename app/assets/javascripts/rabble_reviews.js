RabbleReviews = {};
RabbleReviews.Views = {};
RabbleReviews.Models = {};
RabbleReviews.Collections = {};
RabbleReviews.Routers = {};

$(function () {
    RabbleReviews.games = new RabbleReviews.Models.Games();
    RabbleReviews.games.fetch();
    new RabbleReviews.Routers.RabbleRouter({ $rootEl: $('#content')})
    Backbone.history.start();
});