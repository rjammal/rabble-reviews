RabbleReviews = {
    Views: {}, 
    Models: {}, 
    Collections: {},
    Routers = {}, 

    initialize: function () { 
        this.games = new RabbleReviews.Models.Games();
        this.games.fetch();
        new this.Routers.RabbleRouter({ $rootEl: $('#content')})
        Backbone.history.start();
    }
};

