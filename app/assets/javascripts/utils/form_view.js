Backbone.FormView = Backbone.View.extend({
    handleErrors: function (model, response) {
        html = "<ul>";
        for (var error in response.responseJSON) {
            html += "<li>" + response.responseJSON[error] + "</li>";
        }
        html += "</ul>"
        this.$(".errors").html(html);
    }
});