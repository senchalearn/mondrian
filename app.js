new Ext.Application({
    name: 'mondrian',

    launch: function() {
        var app = this;

        // construct UI
        var viewport = this.viewport = new Ext.Panel({
            fullscreen: true,
            layout: 'card'
        });

    }
});