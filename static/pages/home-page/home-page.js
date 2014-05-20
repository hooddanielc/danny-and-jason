app.modules.HomePage = app.modules.PageBase.extend({
    renderPage: function() {
        // render the huge homepage mustache
        console.log('why');
        this.$elPage.html(app.mustache['home-page']);
        console.log('render home page');
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