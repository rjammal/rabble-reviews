RabbleReviews.Models.User = Backbone.Model.extend({
    urlRoot: "api/users", 

    toJSON: function () {
        //add password to existing json
        var json = Backbone.Model.prototype.toJSON.call(this);
        json["password"] = this.get("password");
        //debugger
        return {"user": json};
    }
});