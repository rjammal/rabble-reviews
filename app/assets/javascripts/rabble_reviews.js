window.RabbleReviews = {
    Views: {}, 
    Models: {}, 
    Collections: {},
    Routers: {}, 

    initialize: function () { 
        this.games = new RabbleReviews.Collections.Games();
        this.games.fetch();
        this.genres = new RabbleReviews.Collections.Genres();
        this.genres.fetch();
        new this.Routers.RabbleRouter({ 
            $rootEl: $('#content'), 
            $navbar: $('#main-navbar')
        });
        Backbone.history.start();
    }
};

