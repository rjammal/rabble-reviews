Backbone.FormView = Backbone.View.extend({
    handleErrors: function (errors) {
        $errors = this.$(".errors")
        $errors.html("").addClass("alert alert-danger alert-dismissable");
        for (var error in errors) {
            $errors.append(errors[error] + "<br>");
        }
    }, 

    handleFile: function (event, callback) {
        var file = event.currentTarget.files[0]; 
        var reader = new FileReader();
        var formView = this; 
        reader.onload = function (e) {
            formView.model.set("image", this.result);
            callback && callback();
        }
        reader.readAsDataURL(file);
    }, 

    getRandomSplashURL: function () {
        var pics = [
            "images/splash/mario.jpg", 
            "images/splash/god-of-war.jpg",
            "images/splash/catan.jpg",
            "images/splash/RoboRally.jpg",
            ];
        var index = Math.floor(Math.random() * pics.length);
        return pics[index];
    },
});