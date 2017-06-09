var MobileNavigation = new Vue({
    el: '#MobileNavigation',
    data: {
        items: [],
        activeItem: null
    },
    ready: function() {
        var el = this.$el;
        $(el).on('open', function() {
            $(el).fadeIn();
        });
        $(el).on('close', function() {
            $(el).fadeOut();
        });
        $(document).keyup(function(e) {
            if (e.keyCode == 27) { // escape key
                $(el).trigger('close');
            }
        });
    },
    directives: {
        menu: {
            bind: function() {
                // add "activated" classes when menu is activated
                $(this.el).on('menu-activated', function(event, params) {
                    $(event.target).addClass('menu-active');
                    $(event.target).addClass(params.back ? 'animate-inFromLeft' : 'animate-inFromRight');
                });
                // add "deactivated" classes when menu is deactivated
                $(this.el).on('menu-deactivated', function(event, params) {
                    $(event.target).removeClass('menu-active');
                    $(event.target).addClass(params.back ? 'animate-outToRight' : 'animate-outToLeft');
                });
                // this removes the animation class automatically after the animation has completed
                $(this.el).on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',
                    function() {
                        $('.menu').removeClass (function (index, className) {
                            return (className.match (/(^|\s)animate-\S+/g) || []).join(' ');
                        });
                    }
                );
            }
        }
    },
    methods: {
        getItemById: function(id) {
            for (var key in this.items) {
                if (this.items[key].id === id) {
                    return this.items[key];
                }
            }
            return null;
        },
        itemHasChildren: function({id: id}) {
            var items = this.items.filter(function(item) {
                return item.parent === id;
            });
            return items.length > 0;
        },
        getBreadcrumbItems: function(itemId) {
            var items = [];
            var tmp = this.getItemById(itemId);
            while (tmp) {
                items.unshift(tmp);
                tmp = this.getItemById(tmp.parent);
            }
            return items;
        },
        getGroupedMenus: function() {
            var groupedMenus = {};
            for (var key in this.items) {
                // skip root item
                if (this.items[key].parent === '-root') {
                    continue;
                }
                if (!groupedMenus[this.items[key].parent]) {
                    groupedMenus[this.items[key].parent] = [];
                }
                groupedMenus[this.items[key].parent].push(this.items[key]);
            }
            return groupedMenus;
        },
        addItem: function(id, title, parent, url) {
            this.items.push({
                id: id,
                title: title,
                parent: parent ? parent : '-root',
                url: url
            });
        },
        triggerItem: function(id, modifier) {
            var item = this.getItemById(id);
            if (modifier === 'useUrl' && item.url) {
                window.location.href = item.url;
                return;
            }
            if (!this.itemHasChildren(item)) {
                return;
            }
            var activeItem = this.activeItem;
            Vue.nextTick(function() {
                if (activeItem) {
                    $('.menu-' + activeItem).trigger('menu-deactivated', { back: modifier === 'back' });
                }
                $('.menu-' + id).trigger('menu-activated', { back: modifier === 'back' });
            });
            this.activeItem = id;
        }
    }
});