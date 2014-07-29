Backbone.FormView = Backbone.View.extend({
    handleErrors: function (errors) {
        $errors = this.$(".errors")
        $errors.html("").addClass("alert alert-danger alert-dismissable");
        for (var error in errors) {
            $errors.append(errors[error] + "<br>");
        }
    }, 

    handleFile: function (event) {
        var file = event.currentTarget.files[0]; 
        var reader = new FileReader();
        var formView = this; 
        reader.onload = function (e) {
            formView.model.set("image", this.result);
        }
        reader.readAsDataURL(file);
    }, 

    getRandomSplashURL: function () {
        var pics = [
            "https://s3-us-west-2.amazonaws.com/com.rabble-reviews/splash/mario.jpg", 
            "https://s3-us-west-2.amazonaws.com/com.rabble-reviews/splash/god-of-war.jpg",
            "https://s3-us-west-2.amazonaws.com/com.rabble-reviews/splash/catan.jpg",
            "https://s3-us-west-2.amazonaws.com/com.rabble-reviews/splash/RoboRally.jpg",
            ];
        var index = Math.floor(Math.random() * pics.length);
        return pics[index];
    },
});