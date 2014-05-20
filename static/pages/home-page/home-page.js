app.modules.HomePage = app.modules.PageBase.extend({
    inRange: function(y, x) {
        return y >= x - 150 && y <= x + 150;
    },
    renderPage: function() {
        // render the huge homepage mustache
        this.$elPage.html(app.mustache['home-page']);
        
        // trigger router when scrolled to position
        var win = $(window);
        var self = this;
        win.on('scroll', function(e) {
            if(self.animating) {
                return;
            }
            var scroll_pos = win.scrollTop();
            var els = self.$elPage.find('.trigger-scroll');
            if(scroll_pos < 300) {
                self.$el.find('.nav-scroll-ref').parent().removeClass('active');
                return;
            }
            for(var i = 0; i < els.length; ++i) {
                var el = $(els[i]);
                if(self.inRange(scroll_pos, el.offset().top - 50)) {
                    // change navigation state to match scroll position
                    self.$el.find('.nav-scroll-ref').parent().removeClass('active');
                    $('[href="#'+ el.attr('data-name') +'"]').parent().addClass('active');
                    self.router.navigate(el.attr('data-name'));
                    break;
                }
            }
        });
    }
});

(function() {
    var el = $('<div/>');
    $(document.body).append(el);
    var page = new app.modules.HomePage({
        el: el,
        model: new Backbone.Model()
    });
    page.render();
})();