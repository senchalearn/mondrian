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

        // the page that displays each chapter
        var page = viewport.page = new Ext.Panel({
            cls:'page',
            styleHtmlContent: true,
            tpl: '<h2>{title}</h2>{content}',
            scroll: 'vertical'
        });

        // the data-bound menu list
        var menuList = viewport.menuList = new Ext.List({
            store: this.stores.pages,
            itemTpl: '{title}',
            allowDeselect: false,
            singleSelect: true
        });

        // a wrapper around the menu list
        var menu = viewport.menu = new Ext.Panel({
            items: [menuList],
            layout: 'fit',
            width:150,
            dock:'left'
        });

        // a button that toggles the menu when it is floating
        var menuButton = viewport.menuButton = new Ext.Button({
            iconCls:'list',
            iconMask: true
        });

        // a button that slides page back to list (portrait phone only)
        var backButton = viewport.backButton = new Ext.Button({
            ui: 'back',
            text: 'Back'
        });

        // a button that pops up a Wikipedia attribution
        var infoButton = viewport.infoButton = new Ext.Button({
            iconCls:'info',
            iconMask: true
        });

        // the toolbar across the top of the app, containing the buttons
        var toolbar = this.toolbar = new Ext.Toolbar({
            ui:'light',
            title: 'Piet Mondrian',
            items: [backButton, menuButton, {xtype:'spacer'}, infoButton]
        });

        //stitch the UI together and create an entry page
        viewport.addDocked(toolbar);
        viewport.setActiveItem(page);
        page.update('<img class="photo" src="head.jpg">');

        // add profile behaviors for relevant controls
        viewport.setProfile = function (profile) {
            if (profile=='portraitPhone') {
                this.setActiveItem(this.menu);
            }
            if (profile=='landscapePhone') {
                this.remove(this.menu, false);
                this.setActiveItem(this.page);
            }
            if (profile=='portraitTablet') {
                this.removeDocked(this.menu, false);
            }
            if (profile=='landscapeTablet') {
                this.addDocked(this.menu);
            }
        };
        menu.setProfile = function (profile) {
            if (profile=="landscapePhone" || profile=="portraitTablet") {
                this.hide();
                if (this.rendered) {
                    this.el.appendTo(document.body);
                }
                this.setFloating(true);
                this.setSize(150, 200);
            } else {
                this.setFloating(false);
                this.show();
            }
        };
        menuButton.setProfile = function (profile) {
            if (profile=="landscapePhone" || profile=="portraitTablet") {
                this.show();
            } else {
                this.hide();
            }
        };
        backButton.setProfile = function (profile) {
            if (profile=='portraitPhone') {
                this.show();
            } else {
                this.hide();
            }
        };

    },
    
    profiles: {
        portraitPhone: function() {
            return Ext.is.Phone && Ext.orientation == 'portrait';
        },
        landscapePhone: function() {
            return Ext.is.Phone && Ext.orientation == 'landscape';
        },
        portraitTablet: function() {
            return Ext.orientation == 'portrait';
        },
        landscapeTablet: function() {
            return Ext.orientation == 'landscape';
        }
    }
});