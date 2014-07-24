RabbleReviews.Routers.RabbleRouter = Backbone.Router.extend({
    
    initialize: function(options) {
        this.$rootEl = options.$rootEl;
    }, 

    routes: {
        "": "sessionNew", 
        "users/new": "userNew", 
        "games": "gamesIndex"
    }, 

    sessionNew: function () {

    }, 

    userNew: function () {

    }, 

    gamesIndex: function () {
        
    }
});