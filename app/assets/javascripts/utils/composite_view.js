Backbone.CompositeView = Backbone.View.extend({
    subviews: function () {
        this._subviews = this._subviews || {}
        return this._subviews
    }, 

    addSubview: function (selector, subview) {
        if (!this.subviews()[selector]) {
            this.subviews()[selector] = [];
        }
        this.subviews()[selector].push(subview.render());
        this.attachSubview(selector, subview);
    }, 

    attachSubview: function (selector, subview) {
        this.$(selector).append(subview.$el);
        subview.delegateEvents();
    },

    attachSubviews: function () {
        var composite = this;
        for (var selector in this.subviews()) {
            this.$(selector).empty();
            this.subviews()[selector].forEach(function (subview) {
                composite.attachSubview(selector, subview);

                // if subview is itself a composite, attach its subviews
                if (subview.attachSubviews) {
                    subview.attachSubviews();
                }
            });
        }
    }, 

    removeSubview: function (selector, subview) {
        var subviewArray = this.subviews()[selector];
        var index = subviewArray.indexOf(subview);
        subviewArray.splice(index, 1);

        subview.remove();
    }, 

    remove: function () {
        Backbone.View.prototype.remove.call(this);
        for (var selector in this.subviews()) {
            this.subviews()[selector].forEach(function (subview) {
                subview.remove();
            });
        };
    }
    
});