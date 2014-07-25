Backbone.FormView = Backbone.View.extend({
    handleErrors: function (errors) {
        $errors = this.$(".errors")
        $errors.html("").addClass("alert alert-danger");
        for (var error in errors) {
            $errors.append(errors[error] + "<br>");
        }
    }
});