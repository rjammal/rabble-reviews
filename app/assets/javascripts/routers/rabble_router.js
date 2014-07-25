RabbleReviews.Routers.RabbleRouter = Backbone.Router.extend({
    
    initialize: function(options) {
        this.$rootEl = options.$rootEl;
        this.$navbar = options.$navbar;
        this.$login = options.$login;
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
        this._swapView(view, { nologin: true });
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
        this._swapView(view, { nologin: true });
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

    _swapView: function (view, options) {
        this.currentView && this.currentView.remove(); 
        this.currentView = view;
        this.$rootEl.html(view.render().$el);
        this.$navbar.html(this.navbar());
        
        options = options || {};
        this.manage_login(options);
    }, 

    navbar: function () {
        return JST["navbar"]({ currentUser: RabbleReviews.currentUser });
    },

    manage_login: function (options) {
        // clear login message if logged in
        if (RabbleReviews.currentUser) {
           this.$login.html("").removeClass();
        }
        // if we are not currently logged in and on a page that requires login, redirect to login
        if (!RabbleReviews.currentUser && !options.nologin) {
            this.$login.html("You must log in first").addClass("alert alert-danger");
            Backbone.history.navigate("#", { trigger: true });
        }
    }
});