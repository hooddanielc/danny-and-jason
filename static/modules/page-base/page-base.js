app.modules.PageBase = Backbone.View.extend({
    // override to create you're own page
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
                $('html, body').animate({
                    scrollTop: 0
                }, 400);
            },
            links: function() {
                self.$el.find('.nav-scroll-ref').parent().removeClass('active');
                $('[href="'+ location.hash +'"]').parent().addClass('active');
                $('html, body').animate({
                    scrollTop: $(location.hash + '-scroll').offset().top
                }, 400);
            }
        });

        // TODO: Listen to scroll event
        // and change nav accordingly

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
