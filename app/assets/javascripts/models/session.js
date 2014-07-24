RabbleReviews.Models.Session = Backbone.Model.extend({
    url: "api/session",

    toJSON: function () {
        //add password to existing json
        var json = Backbone.Model.prototype.toJSON.call(this);
        json["password"] = this.get("password");
        return {"session": json};
    }
});