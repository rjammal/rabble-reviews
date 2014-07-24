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
        var session = new RabbleRouter.Models.Session();
        var view = new RabbleRouter.Views.SessionNew({ model: session });
        this._swapView(view);
    }, 

    userNew: function () {
        var user = new RabbleRouter.Models.User();
        var view = new RabbleRouter.Views.SessionNew({ model: user });
        this._swapView(view);
    }, 

    gamesIndex: function () {
        var view = new RabbleRouter.Views.GameIndex({ collection: RabbleRouter.games });
        this._swapView(view);
    }, 

    _swapView: function (view) {
        this.currentView && this.currentView.remove(); 
        this.currentView = view;
        this.$rootEl.html(view.render());
    }
});