Backbone.FormView = Backbone.View.extend({
    handleErrors: function (errors) {
        $errors = this.$(".errors")
        $errors.html("").addClass("alert alert-danger");
        for (var error in errors) {
            $errors.append(errors[error] + "<br>");
        }
    }, 

    handleFile: function (event) {
        var file = event.currentTarget.files[0]; 
        var reader = new FileReader();
        var formView = this; 
        debugger
        reader.onload = function (e) {
            formView.model.set("photo", this.result);
            debugger
        }
        debugger
        reader.readAsDataURL(file);
        debugger
    }, 

    getRandomSplashURL: function () {
        var pics = [
            "https://s3-us-west-2.amazonaws.com/com.rabble-reviews/splash/puerto_rico.jpg", 
            "https://s3-us-west-2.amazonaws.com/com.rabble-reviews/splash/mario.jpg", 
            "https://s3-us-west-2.amazonaws.com/com.rabble-reviews/splash/god-of-war.jpg",
            "https://s3-us-west-2.amazonaws.com/com.rabble-reviews/splash/catan.jpg",
            ];
        var index = Math.floor(Math.random() * pics.length);
        return pics[index];
    },
});