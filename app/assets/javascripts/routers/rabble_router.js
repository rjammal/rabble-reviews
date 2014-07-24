RabbleReviews.Routers.RabbleRouter = Backbone.Router.extend({
    
    initialize: function(options) {
        this.$rootEl = options.$rootEl;
        this.$navbar = options.$navbar;
    }, 

    routes: {
        "": "sessionNew", 
        "logout": "sessionDestroy",
        "users/new": "userNew", 
        "games": "gamesIndex"
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
        this.sessionNew();
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

    _swapView: function (view) {
        this.currentView && this.currentView.remove(); 
        this.currentView = view;
        this.$rootEl.html(view.render().$el);
        this.$navbar.html(this.navbar());
    }, 

    // temporarily add html here since ejs templates do not seem to work outside of views
    navbar: function () {
        // if (RabbleReviews.currentUser) {
        //     var text = 'Logged in as ' + RabbleReviews.currentUser.name;
        //     text +=' <a href="#logout">Sign Out</a>';
        //     return text;
        // } else {
        //     var text = '<a href="#">Sign In</a> <a href="#users/new">Sign Up</a>';
        //     return text;
        // }
        //debugger
        return JST["navbar"]({ currentUser: RabbleReviews.currentUser });
    }
});