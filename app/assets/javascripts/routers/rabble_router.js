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
        var session = new RabbleReviews.Models.Session();
        var view = new RabbleReviews.Views.SessionNew({ model: session });
        this._swapView(view);
    }, 

    userNew: function () {
        var user = new RabbleReviews.Models.User();
        var view = new RabbleReviews.Views.SessionNew({ model: user });
        this._swapView(view);
    }, 

    gamesIndex: function () {
        var view = new RabbleReviews.Views.GameIndex({ collection: RabbleReviews.games });
        this._swapView(view);
    }, 

    _swapView: function (view) {
        this.currentView && this.currentView.remove(); 
        this.currentView = view;
        this.$rootEl.html(view.render().$el);
    }
});