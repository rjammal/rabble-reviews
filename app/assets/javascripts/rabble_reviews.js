window.RabbleReviews = {
    Views: {}, 
    Models: {}, 
    Collections: {},
    Routers: {}, 

    initialize: function () { 
        this.genres = new RabbleReviews.Collections.Genres();
        this.genres.fetch();
        new this.Routers.RabbleRouter({ 
            $rootEl: $('#content'), 
            $navbar: $('#main-navbar'), 
            $login: $('#login-first-error')
        });
        Backbone.history.start();
    }
};

