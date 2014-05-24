app.modules.PageBase = Backbone.View.extend({
    // override to create you're own page
    headerShown: true,
    events: {},
    initialize: function() {
        this.events['click .nav-scroll-ref'] = 'navigate';
        this.events['click .navbar-brand'] = 'navigateTop';

        // router that drives scrolling
        // navigation
        var self = this;
        this.page_router = Backbone.Router.extend({
            routes: {
                "home": "home",
                "date": "links",
                "location": "links",
                "accomodation": "links"
            },
            home: function() {
                self.$el.find('.nav-scroll-ref').parent().removeClass('active');
                self.animating = true;
                $('html, body').animate({
                    scrollTop: 0
                }, 600, function() {
                    self.animating = false;
                });
            },
            links: function() {
                self.$el.find('.nav-scroll-ref').parent().removeClass('active');
                $('[href="'+ location.hash +'"]').parent().addClass('active');
                self.animating = true;
                $('html, body').animate({
                    scrollTop: $(location.hash + '-scroll').offset().top - 50
                }, 600, function() {
                    self.animating = false;
                });
            }
        });

        this.router = new this.page_router();
        this.initializePage();
    },
    navigateTop: function(e) {
        e.preventDefault();
        this.router.navigate('home', {trigger: true});
    },
    navigate: function(e) {
        e.preventDefault();
        this.router.navigate($(e.currentTarget).attr('data-name'), {trigger: true});
    },
    hideHeader: function() {
        if(self.headerShown) {
            self.headerShown = false;
            this.$el.find('.page-base').addClass('header-hidden');
        }
    },
    showHeader: function() {
        if(!self.headerShown) {
            self.headerShown = true;
            this.$el.find('.page-base').removeClass('header-hidden');
        }
    },
    renderPage: function() {},     // virtual void
    initializePage: function() {}, // virtual void
    render: function() {
        this.$el.html(app.mustache['page-base']);
        this.$elPage = this.$el.find('.page-base-container');
        this.renderPage();
        // start the navigation
        Backbone.history.start();
    }
});
