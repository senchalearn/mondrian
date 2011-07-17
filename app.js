new Ext.Application({
    name: 'mondrian',

    launch: function() {
        var app = this;

        // construct UI
        var viewport = this.viewport = new Ext.Panel({
            app: this,
            fullscreen: true,
            layout: 'card',
            showingSplash: true,
            showingPage: false
        });

    }
});