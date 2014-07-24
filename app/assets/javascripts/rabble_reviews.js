window.RabbleReviews = {
    Views: {}, 
    Models: {}, 
    Collections: {},
    Routers: {}, 

    initialize: function () { 
        this.games = new RabbleReviews.Collections.Games();
        this.games.fetch();
        new this.Routers.RabbleRouter({ 
            $rootEl: $('#content'), 
            $navbar: $('#main-navbar')
        });
        Backbone.history.start();
    }
};

