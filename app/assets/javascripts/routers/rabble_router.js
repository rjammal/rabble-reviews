RabbleReviews.Routers.RabbleRouter = Backbone.Router.extend({
    
    initialize: function(options) {
        this.$rootEl = options.$rootEl;
        this.$navbar = options.$navbar;
    }, 

    routes: {
        "": "sessionNew", 
        "logout": "sessionDestroy",
        "users/new": "userNew", 
        "games": "gamesIndex", 
        "games/new": "gamesNew", 
        "games/:id": "gamesShow"
    }, 

    sessionNew: function () {
        var session = new RabbleReviews.Models.Session();
        var view = new RabbleReviews.Views.SessionNew({ model: session });
        this._swapView(view);
    }, 

    sessionDestroy: function () {
        var session = new RabbleReviews.Models.Session({ id: 0 });
        session.destroy();
        delete RabbleReviews.currentUser;
        Backbone.history.navigate("#", { trigger: true });
    },

    userNew: function () {
        var user = new RabbleReviews.Models.User();
        var view = new RabbleReviews.Views.UserNew({ model: user });
        this._swapView(view);
    }, 

    gamesIndex: function () {
        var view = new RabbleReviews.Views.GameIndex({ collection: RabbleReviews.games });
        this._swapView(view);
    }, 

    gamesNew: function () {
        var game = new RabbleReviews.Models.Game();
        var view = new RabbleReviews.Views.GameNew({ model: game });
        this._swapView(view);
    },

    gamesShow: function (id) {
        var game = RabbleReviews.games.getOrFetch(id);
        var view = new RabbleReviews.Views.GameShow({ model: game });
        this._swapView(view);
    },

    _swapView: function (view) {
        this.currentView && this.currentView.remove(); 
        this.currentView = view;
        this.$rootEl.html(view.render().$el);
        this.$navbar.html(this.navbar());
    }, 

    navbar: function () {
        return JST["navbar"]({ currentUser: RabbleReviews.currentUser });
    }
});