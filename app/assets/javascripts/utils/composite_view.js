Backbone.CompositeView = Backbone.View.extend({
    subviews: {}, 

    addSubview: function (selector, subview) {
        if (!this.subviews[selector]) {
            this.subviews[selector] = [];
        }
        this.subviews[selector].push(subview.render());
        this.$el.$(selector).append(subview.$el);
        subview.delegateEvents();

        // if subview is itself a composite, attach its subviews
        if (subview.attachSubviews) {
            subview.attachSubviews();
        }
    }, 

    attachSubviews: function () {
        var composite = this;
        this.subviews.each(function (selector) {
            composite.$(selector).empty();
            composite.subviews[selector].each(function (subview) {
                composite.addSubview(selector, subview);
            })
        })
    }, 

    removeSubview: function (selector, subview) {
        var subviewArray = this.subviews[selector];
        var index = subviewArray.indexOf(subview);
        subviewArray.splice(index, 1);

        subview.remove();
    }, 

    remove: function () {
        Backbone.View.prototype.remove.call(this);
        var composite = this;
        this.subviews.each(function (selector) {
            composite.subviews.each(function (subview) {
                subview.remove();
            });
        });
    }
    
});