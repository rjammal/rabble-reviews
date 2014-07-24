Backbone.FormView = Backbone.View.extend({
    handleErrors: function (errors) {
        html = "<ul>";
        for (var error in errors) {
            html += "<li>" + errors[error] + "</li>";
        }
        html += "</ul>"
        this.$(".errors").html(html);
    }
});