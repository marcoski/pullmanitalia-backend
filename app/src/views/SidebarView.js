define([
    'backbone.marionette',
    'models/MenuItem',
    'collections/MenuItems',
    'text!templates/sidebar.html',
], function(Marionette, MenuItem, MenuItems, sidebarTemplate){
    'use strict';

    var MenuItemView = Marionette.View.extend({
        tagName: 'li',
        className: 'treeview',
        isHeader: false,
        template: _.noop,

        regions: {
            subMenu: {
                el: 'ul',
                replaceElement: true
            }
        },

        initialize: function(options){
            this.isHeader = options.isHeader || false;
            if(!this.isHeader){
                this.className += this.model.get('active') ? ' active' : '';
            }else{
                this.className = 'header';
            }
        },

        getRoute: function(){
            if(!_.isNull(this.model.get('route'))){
                return window.Settings.baseUrl+window.Settings.baseApp+'/#'+this.model.get('route');
            }

            return '#';
        },

        onRender: function(){
            var link;
            if(!this.isHeader){
                var route = this.getRoute();
                link = '<a href="'+route+'">' +
                    '<i class="fa '+this.model.get('icon')+'"></i><span>'+this.model.get('title')+'</span>' +
                    '</a>';

            }else{
                link = 'MENU';
                this.$el.addClass('header').removeClass('treeview');
            }
            this.$el.append(link);

            if(!this.isHeader){
                var children = this.model.get('children');
                if(!_.isUndefined(children) && children.length > 0){
                    this.$el.append('<ul>');
                    var subItemView = new MenuView({
                        collection: new MenuItems(children),
                        isSubMenu: true
                    });

                    this.showChildView('subMenu', subItemView);
                }
            }
        }
    });

    var MenuView = Marionette.CollectionView.extend({
        tagName: 'ul',
        template: _.noop,
        className: 'sidebar-menu',
        childView: MenuItemView,
        isSubMenu: false,

        initialize: function(options){
            this.isSubMenu = options.isSubMenu || false;
        },

        onRender: function(){
            console.log('Render Menu');
            if(this.isSubMenu){
                this.$el.removeClass('sidebar-menu').addClass('treeview-menu');
            }
            if(!this.isSubMenu){
                this.addChildView(new MenuItemView({isHeader: true}, 0));
            }
        }
    });

    return Marionette.View.extend({
        template: _.template(sidebarTemplate),
        className: 'sidebar-container',

        onRender: function(){
            this.addRegion('menu', '.sidebar')
        },

        onAttach: function(){
            var menuItemCollection = new MenuItems();
            menuItemCollection.fetch();
            this.showChildView('menu', new MenuView({collection: menuItemCollection}));
        }
    });
});